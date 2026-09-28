import {
  accessSync,
  appendFileSync,
  constants,
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { performance } from "node:perf_hooks"
import { build as esbuild } from "esbuild"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const lilscriptRoot = process.env.LILSCRIPT_ROOT ?? resolve(root, "..", "lilscript")
const dist = resolve(root, "dist")
const file = "unified"
const { version } = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"))
const banner = `/*! @itslil/unified ${version} | LilScript reimplementation of unified | MIT */\n`
// The Node programs (the `node` condition) bind what vfile imports under `node`
// (src/vfile-imports.lil): node:path, node:process and node:url's fileURLToPath.
const nodeImports = `import minpathNode from 'node:path';
import minprocNode from 'node:process';
import {fileURLToPath as urlToPathNode} from 'node:url';
`

function compilerPath() {
  const candidates = [
    process.env.LILSCRIPT_COMPILER,
    resolve(lilscriptRoot, "target", "release", "lilscript"),
    resolve(lilscriptRoot, "target", "debug", "lilscript"),
  ].filter(Boolean)
  for (const candidate of candidates) {
    try {
      accessSync(candidate, constants.X_OK)
      return candidate
    } catch {}
  }
  return null
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit" })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

// Wall time of each compiler invocation. `UNIFIEDLIL_COMPILE_TIMING=<file>` appends one JSON line per
// build; scripts/record-release.mjs reads it for the compile times the Pages site shows.
const compileTimings = []

function compileLil(compiler, sourceName, configName, outputName, source = resolve(root, "src")) {
  const start = performance.now()
  run(compiler, [
    resolve(source, sourceName),
    "--target",
    "js-module",
    "--config",
    resolve(root, configName),
    "-o",
    resolve(dist, outputName),
  ])
  const wallMs = performance.now() - start
  compileTimings.push({ source: `src/${sourceName}`, config: configName, wallMs })
  console.log(`compiled src/${sourceName} with ${configName} in ${wallMs.toFixed(1)} ms`)
}

function compileIfRequested() {
  if (!process.argv.includes("--compile") && existsSync(resolve(dist, `${file}.raw.js`))) {
    return
  }
  const compiler = compilerPath()
  if (!compiler) {
    throw new Error("LilScript compiler not found. Set LILSCRIPT_COMPILER or build lilscript.")
  }
  mkdirSync(dist, { recursive: true })
  // index.lil exports unified's public API only, so the compiler's artifact is the public module;
  // entry.lil keeps the runtime exports (VFileRuntime, ProcessorRuntime) that other ports link.
  // vfile imports #minpath, #minproc and #minurl per export condition. The Node programs
  // compile src/ as it is (src/vfile-imports.lil binds node:path, node:process and node:url);
  // the default programs, for every runtime without `node`, compile a staging copy with vfile's
  // shims (src/browser/vfile-imports.lil) in its place.
  compileLil(compiler, "index.lil", "lilscript.toml", `${file}.node.raw.js`)
  compileLil(compiler, "vfile.lil", "lilscript.toml", "vfile.node.raw.js")
  const staging = resolve(root, ".tmp", "default-src")
  rmSync(staging, { recursive: true, force: true })
  cpSync(resolve(root, "src"), staging, { recursive: true })
  cpSync(resolve(root, "src", "browser", "vfile-imports.lil"), resolve(staging, "vfile-imports.lil"))
  compileLil(compiler, "index.lil", "lilscript.toml", `${file}.raw.js`, staging)
  // The closed lane is the library file (unified.esm.js) under the closed-world settings.
  compileLil(compiler, "index.lil", "lilscript.closed.toml", `${file}.closed.raw.js`, staging)
  compileLil(compiler, "vfile.lil", "lilscript.toml", "vfile.raw.js", staging)
  rmSync(staging, { recursive: true, force: true })
  if (process.env.UNIFIEDLIL_COMPILE_TIMING) {
    const totalMs = compileTimings.reduce((sum, entry) => sum + entry.wallMs, 0)
    appendFileSync(
      process.env.UNIFIEDLIL_COMPILE_TIMING,
      `${JSON.stringify({ compiler, totalMs, invocations: compileTimings })}\n`,
    )
  }
}

compileIfRequested()
mkdirSync(dist, { recursive: true })

// The ESM files ship exactly as the compiler wrote them, plus a license banner: no minifier or
// reprint runs over them (plan rule 6). index.lil exports only unified's public API and vfile.lil only
// the vfile API, so the compiler's export list is the published one; this checks it instead of
// rewriting it.
function exportedNames(source) {
  const names = []
  for (const [, body] of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const entry of body.split(",")) {
      const parts = entry.trim().split(/\s+as\s+/)
      if (parts[0]) names.push(parts[parts.length - 1])
    }
  }
  return names.sort()
}

function publish(rawName, name, publicBanner, keep, node) {
  const rawFile = resolve(dist, rawName)
  if (!existsSync(rawFile)) {
    throw new Error(`dist/${rawName} is missing. Run with --compile after building LilScript.`)
  }
  const source = readFileSync(rawFile, "utf8")
  const names = exportedNames(source)
  if (names.join(",") !== [...keep].sort().join(",")) {
    throw new Error(`dist/${rawName} exports ${names.join(", ")}; expected ${keep.join(", ")}`)
  }
  // Only the Node programs may read the Node modules; the default ones carry vfile's shims.
  const reads = /\b(?:minpathNode|minprocNode|urlToPathNode)\b/.test(source)
  if (reads !== node) throw new Error(`dist/${rawName}: ${node ? "the Node program lacks" : "a default program reads"} the Node module bindings`)
  writeFileSync(resolve(dist, name), `${publicBanner}${node ? nodeImports : ""}${source.trimEnd()}\n`)
}

publish(`${file}.raw.js`, `${file}.esm.js`, banner, ["unified"], false)
publish(`${file}.node.raw.js`, `${file}.node.js`, banner, ["unified"], true)
publish(`${file}.closed.raw.js`, `${file}.closed.js`, banner, ["unified"], false)
const vfileBanner = `/*! @itslil/unified ${version} vfile | LilScript reimplementation of vfile@6.0.3 | MIT */\n`
publish("vfile.raw.js", "vfile.esm.js", vfileBanner, ["VFile", "VFileMessage", "createVFileMessage"], false)
publish("vfile.node.raw.js", "vfile.node.js", vfileBanner, ["VFile", "VFileMessage", "createVFileMessage"], true)

// CommonJS and UMD: the compiler has no CommonJS or script-with-exports target yet, so these three
// files are esbuild format conversions of the compiler's ESM (no minification). They are labelled
// "post-processed by esbuild, not compiler-written" in site/results.json and on the site; replacing
// them with compiler-written files is plan task M12.2.
// CommonJS is what `require` gets under `node`: the Node programs.
await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, `${file}.node.js`)],
  outfile: resolve(dist, `${file}.cjs`),
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "node18",
  legalComments: "none",
  minifyIdentifiers: false,
  minifySyntax: false,
  banner: { js: banner },
  logLevel: "error",
})

await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, "vfile.node.js")],
  outfile: resolve(dist, "vfile.cjs"),
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "node18",
  legalComments: "none",
  minifyIdentifiers: false,
  minifySyntax: false,
  banner: { js: vfileBanner },
  logLevel: "error",
})

await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, `${file}.esm.js`)],
  outfile: resolve(dist, `${file}.umd.js`),
  bundle: true,
  format: "iife",
  globalName: "unified",
  footer: {
    js: `globalThis.unified=unified.unified||unified;`,
  },
  legalComments: "none",
  minifyIdentifiers: false,
  minifySyntax: false,
  banner: { js: banner },
  logLevel: "error",
})

copyFileSync(resolve(root, "types", `${file}.d.ts`), resolve(dist, `${file}.d.ts`))
console.log(`wrote dist/${file}.esm.js, dist/${file}.node.js, dist/${file}.cjs, dist/${file}.umd.js, dist/${file}.closed.js, dist/vfile.esm.js, dist/vfile.node.js, dist/vfile.cjs`)
