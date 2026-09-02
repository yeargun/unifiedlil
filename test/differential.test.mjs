import assert from "node:assert/strict"
import test from "node:test"

import {unified as official} from "unified"
import {unified as actual} from "../dist/unified.esm.js"
import {VFile} from "vfile"

function configure(factory, trace) {
  function syntax(options) {
    trace.push(["attach", options])
    this.parser = (document, file) => {
      trace.push(["parse", document, file.path])
      return {type: "root", children: [{type: "text", value: document}]}
    }
    this.compiler = (tree, file) => {
      trace.push(["stringify", file.path])
      return tree.children.map((node) => node.value).join("")
    }
    return (tree, file) => {
      trace.push(["transform", file.path])
      tree.children[0].value += options.suffix
    }
  }

  return factory()
    .data("shared", {nested: true})
    .use(syntax, {prefix: "ignored", suffix: "!"})
    .use(syntax, {suffix: "?"})
}

test("processor behavior and evaluation order match unified@11.0.5", () => {
  const officialTrace = []
  const actualTrace = []
  const officialFile = new VFile({path: "/tmp/input.md", value: "alpha"})
  const actualFile = new VFile({path: "/tmp/input.md", value: "alpha"})
  const officialProcessor = configure(official, officialTrace)
  const actualProcessor = configure(actual, actualTrace)

  assert.equal(String(actualProcessor.processSync(actualFile)), String(officialProcessor.processSync(officialFile)))
  assert.deepEqual(actualTrace, officialTrace)
  assert.deepEqual(actualProcessor.data(), officialProcessor.data())
  assert.equal(actualProcessor.processSync(actualFile), actualFile)
})

test("plugin errors and asynchronous completion match upstream", async () => {
  const error = new Error("boom")
  for (const factory of [official, actual]) {
    const processor = factory().use(function () {
      return function (_tree, _file, done) {
        queueMicrotask(() => done(error))
      }
    })
    await assert.rejects(processor.run({type: "root"}), (caught) => caught === error)
  }
})
