import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const closedPath = resolve(root, "dist/unified.closed.js")

describe("@itslil/unified closed LilScript lane", () => {
  it("is compiled next to the library artifact", () => {
    assert.equal(existsSync(closedPath), true, "dist/unified.closed.js")
  })

  it("keeps the unified export and can construct a processor", async () => {
    const source = readFileSync(closedPath, "utf8")
    const exports = source.match(/export\{[^}]+\}/)?.[0] ?? ""
    assert.match(exports, / as unified[},]/)
    const closed = await import(pathToFileURL(closedPath).href)
    assert.deepEqual(Object.keys(closed), ["unified"])
    assert.equal(typeof closed.unified, "function")
    const processor = closed.unified()
    assert.equal(typeof processor, "function")
    assert.ok(processor)
  })
})
