import assert from "node:assert/strict"
import {execFileSync} from "node:child_process"
import test from "node:test"

test("canonical graph measurement uses pinned official Terser", () => {
  const result = JSON.parse(execFileSync(process.execPath, ["scripts/measure-graph.mjs"], {encoding: "utf8"}))
  assert.equal(result.tools.esbuild, "0.28.1")
  assert.equal(result.tools.terser, "5.51.2")
  assert.deepEqual(Object.keys(result.itslil.components), ["@itslil/unified"])
  assert.ok(result.official.terserMangle.brotli11 > 0)
  assert.ok(result.itslil.graph.brotli11 > 0)
})
