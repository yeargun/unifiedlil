// What vfile resolves per runtime, compared with vfile itself: upstream vfile@6 and
// @itslil/unified/vfile bundled with the same export conditions, run in the same
// environment. vfile imports #minpath, #minproc and #minurl as node:path, node:process
// and node:url under `node` and as its own shims everywhere else.
import assert from "node:assert/strict"
import {mkdirSync, rmSync, writeFileSync} from "node:fs"
import {resolve} from "node:path"
import test from "node:test"
import {pathToFileURL} from "node:url"

const root = new URL("..", import.meta.url).pathname
const scratch = resolve(root, ".tmp", "environments")

async function bundle(name, specifier, conditions) {
  const {build} = await import("esbuild")
  const result = await build({
    stdin: {contents: `export {VFile} from "${specifier}"`, resolveDir: root},
    bundle: true, conditions, external: ["node:*"], format: "esm",
    mainFields: conditions.includes("browser") ? ["browser", "module", "main"] : ["module", "main"],
    platform: "neutral", write: false, logLevel: "silent", metafile: true,
  })
  mkdirSync(scratch, {recursive: true})
  const path = resolve(scratch, `${name}.mjs`)
  writeFileSync(path, result.outputFiles[0].text)
  const inputs = Object.keys(result.metafile.inputs).filter((input) => input.startsWith("dist/"))
  return {VFile: (await import(pathToFileURL(path).href)).VFile, inputs}
}

// Every path getter and setter, file URLs and the working directory; each step records
// its result or the error it throws.
function probe(VFile) {
  const seen = []
  const step = (name, run) => {
    try {
      const value = run()
      seen.push([name, value instanceof Array ? [...value] : value])
    } catch (error) {
      seen.push([name, `throws ${error.name}${error.code ? ` ${error.code}` : ""}: ${error.message}`])
    }
  }
  const file = new VFile()
  step("cwd", () => file.cwd)
  step("given cwd", () => new VFile({cwd: "/given"}).cwd)
  step("no path", () => [file.path, file.basename, file.dirname, file.extname, file.stem])
  step("set path", () => {
    file.path = "~/docs/readme.md"
    return [file.basename, file.dirname, file.extname, file.stem]
  })
  step("set basename", () => {
    file.basename = "index.mdx"
    return file.path
  })
  step("set stem", () => {
    file.stem = "notes.old"
    return [file.path, file.extname]
  })
  step("set extname", () => {
    file.extname = ".txt"
    return file.path
  })
  step("set dirname", () => {
    file.dirname = "../up/./x"
    return [file.path, file.dirname]
  })
  step("relative dots", () => {
    file.path = "./a/../b//c/"
    return [file.basename, file.dirname, file.extname, file.stem]
  })
  step("a backslash path", () => {
    file.path = "C:\\docs\\a.md"
    return [file.basename, file.dirname, file.extname]
  })
  step("basename with a separator", () => {
    file.basename = "a/b"
  })
  step("dirname without a path", () => {
    new VFile().dirname = "x"
  })
  step("a file URL", () => {
    file.path = new URL("file:///tmp/a%20b.md")
    return [file.path, file.basename]
  })
  step("a file URL with a host", () => {
    file.path = new URL("file://server/share/a.md")
  })
  step("an encoded slash", () => {
    file.path = new URL("file:///a%2Fb")
  })
  step("another scheme", () => {
    file.path = new URL("https://example.com/a.md")
  })
  step("a URL as the value", () => new VFile(new URL("file:///tmp/b.md")).path)
  step("history", () => file.history)
  return seen
}

// A runtime's own process object, installed only while one probe runs.
function withProcess(fake, run) {
  const saved = Object.getOwnPropertyDescriptor(globalThis, "process")
  Object.defineProperty(globalThis, "process", {value: fake, configurable: true, writable: true})
  try {
    return run()
  } finally {
    Object.defineProperty(globalThis, "process", saved)
  }
}

const processes = {
  "no process": undefined,
  "a process without cwd (React Native)": {env: {}},
  "a process whose cwd throws (Next.js edge)": {
    env: {},
    cwd() {
      throw new Error("A Node.js API is used (process.cwd) which is not supported in the Edge Runtime.")
    },
  },
  "a process whose cwd answers (workerd nodejs_compat)": {env: {}, cwd: () => "/bundle"},
}

test("the VFile behaves as upstream's under each runtime's conditions", async (t) => {
  t.after(() => rmSync(scratch, {recursive: true, force: true}))
  const runtimes = {
    "cloudflare workers": [["workerd", "worker", "browser"], "dist/vfile.esm.js"],
    "next.js edge": [["edge-light", "browser", "module", "import"], "dist/vfile.esm.js"],
    "react-native": [["react-native", "browser"], "dist/vfile.esm.js"],
    browser: [["browser"], "dist/vfile.esm.js"],
    "no runtime conditions": [["import"], "dist/vfile.esm.js"],
    node: [["node", "import"], "dist/vfile.node.js"],
    deno: [["deno", "node", "import"], "dist/vfile.node.js"],
  }
  for (const [runtime, [conditions, file]] of Object.entries(runtimes)) {
    const tag = runtime.replaceAll(/\W+/g, "-")
    const upstream = await bundle(`upstream-${tag}`, "vfile", conditions)
    const port = await bundle(`port-${tag}`, "@itslil/unified/vfile", conditions)
    assert.deepEqual(port.inputs, [file], `${runtime}: resolved file`)
    const node = conditions.includes("node")
    const expected = probe(upstream.VFile)
    assert.deepEqual(expected[0], ["cwd", node ? process.cwd() : "/"], `${runtime}: upstream's working directory`)
    assert.deepEqual(probe(port.VFile), expected, runtime)
    for (const [label, fake] of Object.entries(processes)) {
      assert.deepEqual(withProcess(fake, () => probe(port.VFile)), withProcess(fake, () => probe(upstream.VFile)), `${runtime}, ${label}`)
    }
  }
})

test("unified resolves the program built for each condition set", async () => {
  const {build} = await import("esbuild")
  const cases = {
    node: [["node", "import"], "dist/unified.node.js"],
    browser: [["browser", "import"], "dist/unified.esm.js"],
    worker: [["worker", "import"], "dist/unified.esm.js"],
    default: [["import"], "dist/unified.esm.js"],
  }
  for (const [name, [conditions, file]] of Object.entries(cases)) {
    const result = await build({
      stdin: {contents: 'export {unified} from "@itslil/unified"', resolveDir: root},
      bundle: true, conditions, external: ["node:*"], format: "esm", metafile: true,
      platform: "neutral", write: false, logLevel: "silent",
    })
    assert.deepEqual(Object.keys(result.metafile.inputs).filter((input) => input.startsWith("dist/")), [file], name)
  }
})

test("each program imports only what vfile imports under its conditions", async () => {
  const {readFileSync} = await import("node:fs")
  const imports = (file) => [...readFileSync(resolve(root, file), "utf8").matchAll(/from\s*["']([^"']+)["']/g)].map((match) => match[1]).sort()
  for (const file of ["dist/unified.node.js", "dist/vfile.node.js"]) {
    assert.deepEqual(imports(file), ["node:path", "node:process", "node:url"], file)
  }
  for (const file of ["dist/unified.esm.js", "dist/unified.closed.js", "dist/vfile.esm.js"]) {
    assert.deepEqual(imports(file), [], file)
  }
})
