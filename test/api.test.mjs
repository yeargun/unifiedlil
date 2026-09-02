import assert from "node:assert/strict"
import { createRequire } from "node:module"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { runInNewContext } from "node:vm"
import { describe, it } from "node:test"
import { VFile as OfficialVFile } from "vfile"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const source = readFileSync(resolve(root, "dist/unified.esm.js"), "utf8")
const umdSource = readFileSync(resolve(root, "dist/unified.umd.js"), "utf8")
const lilSource = readFileSync(resolve(root, "src/entry.lil"), "utf8")
const pinned = [
  "use",
  "parse",
  "run",
  "runSync",
  "stringify",
  "process",
  "processSync",
  "data",
  "freeze",
  "copy",
  "attachers",
  "parser",
  "compiler",
  "Parser",
  "Compiler",
]

function echoPlugin(options) {
  const suffix = options && options.suffix ? options.suffix : ""
  this.parser = (doc) => ({ type: "root", value: doc })
  this.compiler = (tree) => String(tree.value ?? "")
  return (tree) => {
    tree.value = `${tree.value}${suffix}`
    return tree
  }
}

function markPlugin() {
  return (tree) => {
    tree.seen = true
    tree.value = `${tree.value}!`
    return tree
  }
}

const esm = await import(new URL("../dist/unified.esm.js", import.meta.url))
const cjs = createRequire(import.meta.url)(resolve(root, "dist/unified.cjs"))
const packageCjs = createRequire(import.meta.url)("@itslil/unified")

function assertExports(mod, label) {
  assert.deepEqual(Object.keys(mod).sort(), ["unified"], `${label} exports`)
  assert.equal(typeof mod.unified, "function", `${label}.unified`)
}

describe("@itslil/unified JS library API", () => {
  it("keeps export names and pinned processor keys", () => {
    const exports = source.match(/export\{[^}]+\}/)?.[0] ?? ""
    assert.match(exports, / as unified[},]/)
    const processor = esm.unified()
    for (const name of pinned) {
      assert.match(lilSource, new RegExp(`\\b${name}\\b`), `src pins ${name}`)
      assert.equal(name in processor, true, `.${name} must stay a real member`)
    }
    assert.match(lilSource, /export extern class ProcessorApi/)
    assert.equal(Object.hasOwn(processor, "use"), false)
    assert.deepEqual(Reflect.ownKeys(Object.getPrototypeOf(processor)), [
      "constructor",
      "copy",
      "data",
      "freeze",
      "parse",
      "process",
      "processSync",
      "run",
      "runSync",
      "stringify",
      "use",
    ])
    assert.deepEqual([processor.use.name, processor.use.length], ["use", 1])
    assert.deepEqual([processor.data.name, processor.data.length], ["data", 2])
  })

  it("exposes unified on ESM and CJS", () => {
    assertExports(esm, "esm")
    assertExports(cjs, "cjs")
    assertExports(packageCjs, "package cjs")
    assert.equal(esm.unified.length, 0)
    assert.equal("prototype" in esm.unified, true)
    assert.doesNotThrow(() => new esm.unified())
    assert.doesNotMatch(readFileSync(resolve(root, "dist/unified.cjs"), "utf8"), /require\(["']vfile["']\)/)
  })

  it("processSync parses, transforms, and stringifies", () => {
    const file = esm.unified().use(echoPlugin).processSync("# hi")
    const commonjsFile = cjs.unified().use(echoPlugin).processSync("# hi")
    assert.equal(file.constructor.name, "VFile")
    assert.equal(commonjsFile.constructor.name, "VFile")
    assert.equal(file.value, "# hi")
    assert.equal(file.result, undefined)
    assert.deepEqual(file.messages, [])
    assert.equal(typeof file.data, "object")
  })

  it("preserves caller-provided VFile identity in CommonJS", () => {
    const file = new OfficialVFile("# hi")
    const result = cjs.unified().use(echoPlugin).processSync(file)

    assert.equal(result, file)
    assert.equal(result instanceof OfficialVFile, true)
  })

  it("preserves caller-provided VFile identity in ESM", () => {
    const file = new OfficialVFile("# hi")
    assert.equal(esm.unified().use(echoPlugin).processSync(file), file)
  })

  it("runs transformers in order and accepts plugin options", () => {
    const file = esm
      .unified()
      .use(echoPlugin, { suffix: "?" })
      .use(markPlugin)
      .processSync("hi")
    assert.equal(file.value, "hi?!")
    const tree = esm.unified().use(echoPlugin).use(markPlugin).parse("x")
    assert.equal(tree.type, "root")
    const ran = esm.unified().use(echoPlugin).use(markPlugin).runSync(tree)
    assert.equal(ran.seen, true)
    assert.equal(ran.value, "x!")
  })

  it("parse treats a string as file.value", () => {
    const tree = esm.unified().use(echoPlugin).parse("hello")
    assert.equal(tree.type, "root")
    assert.equal(tree.value, "hello")
  })

  it("registers a direct plugin in each Node artifact", async () => {
    const closed = await import(new URL("../dist/unified.closed.js", import.meta.url))
    const context = {}
    runInNewContext(umdSource, context)
    for (const [label, implementation] of [
      ["esm", esm],
      ["cjs", cjs],
      ["closed", closed],
      ["umd", { unified: context.unified }],
    ]) {
      const processor = implementation.unified()
      let calls = 0
      function plugin() {
        calls++
      }
      assert.equal(processor.use(plugin), processor, label)
      assert.equal(processor.attachers[0][0], plugin, label)
      processor.freeze()
      assert.equal(calls, 1, label)
    }
  })

  it("always passes parser documents as strings", () => {
    const processor = esm.unified()
    processor.parser = (document, file) => {
      assert.equal(typeof document, "string")
      assert.equal(document, "charlie")
      assert.equal(document, String(file))
      return { type: "root" }
    }
    processor.parse({ value: "charlie" })
  })

  it("data() is a mutable bag", () => {
    const processor = esm.unified()
    const bag = processor.data()
    assert.equal(typeof bag, "object")
    processor.data("settings", { gfm: true })
    assert.equal(processor.data("settings").gfm, true)
    bag.keep = 1
    assert.equal(processor.data("keep"), 1)
    assert.equal(processor.data("missing"), undefined)
    assert.equal(processor.data("k", 2), processor)
  })

  it("supports the deprecated copy method", () => {
    const processor = esm.unified().data("answer", 42)
    const copy = processor.copy()
    assert.notEqual(copy, processor)
    assert.equal(copy.data("answer"), 42)
  })

  it("process and run return promises", async () => {
    const processor = esm.unified().use(echoPlugin)
    const file = await processor.process("# hi")
    assert.equal(file.value, "# hi")
    const tree = await processor.run({ type: "root", value: "z" })
    assert.equal(tree.value, "z")
  })

  it("throws when parser or compiler is missing", () => {
    assert.throws(() => esm.unified().parse("# hi"), /parser/)
    assert.throws(() => esm.unified().stringify({ type: "root" }), /compiler/)
    assert.throws(() => esm.unified().processSync("# hi"), /parser/)
    const processor = esm.unified()
    processor.parser = {}
    processor.Parser = () => ({ type: "root" })
    assert.throws(() => processor.parse("# hi"), /parser/)
    assert.throws(() => esm.unified().use(false), /usable value/)
  })
})
