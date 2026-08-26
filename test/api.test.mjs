import assert from "node:assert/strict"
import { createRequire } from "node:module"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const source = readFileSync(resolve(root, "dist/unified.esm.js"), "utf8")
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

function assertExports(mod, label) {
  assert.equal(typeof mod.unified, "function", `${label}.unified`)
  assert.equal(mod.default, mod.unified, `${label}.default`)
}

describe("@itslil/unified JS library API", () => {
  it("keeps export names and pinned processor keys", () => {
    const exports = source.match(/export\{[^}]+\}/)?.[0] ?? ""
    assert.match(exports, / as unified[},]/)
    assert.match(exports, / as default[},]/)
    for (const name of pinned) {
      const member = new RegExp(`(?:\\.${name}\\b|[,{]${name}\\s*:)`)
      assert.match(source, member, `.${name} must stay a real member`)
      assert.match(lilSource, new RegExp(`\\b${name}\\b`), `src pins ${name}`)
    }
    assert.match(lilSource, /export extern class ProcessorApi/)
  })

  it("exposes unified on ESM and CJS", () => {
    assertExports(esm, "esm")
    assertExports(cjs, "cjs")
  })

  it("processSync parses, transforms, and stringifies", () => {
    const file = esm.unified().use(echoPlugin).processSync("# hi")
    assert.equal(file.value, "# hi")
    assert.equal(file.result, undefined)
    assert.deepEqual(file.messages, [])
    assert.equal(typeof file.data, "object")
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
    assert.throws(() => esm.unified().use(false), /usable value/)
  })
})
