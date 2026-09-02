import assert from "node:assert/strict"
import test from "node:test"

import {build} from "esbuild"

test("browser graph contains the directly composed pure LilScript VFile", async () => {
  const result = await build({
    bundle: true,
    conditions: ["browser", "import"],
    entryPoints: [new URL("../dist/unified.esm.js", import.meta.url).pathname],
    format: "esm",
    legalComments: "none",
    metafile: true,
    platform: "browser",
    write: false,
  })
  const inputs = Object.keys(result.metafile.inputs)
  assert.deepEqual(inputs, ["dist/unified.esm.js"])
  assert.equal(inputs.some((path) => path.includes("node_modules/vfile/")), false)

  const source = Buffer.from(result.outputFiles[0].contents).toString("base64")
  const {unified} = await import(`data:text/javascript;base64,${source}`)
  let received
  const processor = unified().use(function () {
    this.parser = () => ({type: "root"})
    this.compiler = () => "done"
    return function (_tree, file) {
      received = file
    }
  })
  const file = processor.processSync("input")
  assert.equal(file, received)
  assert.equal(file.constructor.name, "VFile")
  assert.equal(String(file), "done")
})
