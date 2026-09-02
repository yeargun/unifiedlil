import assert from "node:assert/strict"
import {createRequire} from "node:module"
import test from "node:test"

import {VFile as OfficialVFile} from "vfile"
import {
  VFile,
  VFileMessage,
  createVFileMessage,
} from "@itslil/unified/vfile"

const require = createRequire(import.meta.url)

test("pure Lil VFile keeps constructor, value, and path behavior", () => {
  const file = new VFile({path: "/docs/readme.md", value: "text"})
  assert.equal(file.constructor, VFile)
  assert.equal(file.constructor.name, "VFile")
  assert.equal(file.path, "/docs/readme.md")
  assert.equal(file.basename, "readme.md")
  assert.equal(file.stem, "readme")
  assert.equal(file.extname, ".md")
  assert.equal(file.dirname, "/docs")
  assert.equal(String(file), "text")

  file.basename = "index.html"
  file.stem = "guide"
  file.extname = ".md"
  file.dirname = "/reference"
  assert.equal(file.path, "/reference/guide.md")
  assert.deepEqual(file.history, [
    "/docs/readme.md",
    "/docs/index.html",
    "/docs/guide.html",
    "/docs/guide.md",
    "/reference/guide.md",
  ])
})

test("pure Lil VFile matches upstream construction and diagnostics", () => {
  for (const value of [undefined, "alpha", new Uint8Array([97, 98])]) {
    const official = new OfficialVFile(value)
    const actual = new VFile(value)
    assert.deepEqual(Object.keys(actual), Object.keys(official))
    assert.equal(String(actual), String(official))
    assert.deepEqual(actual.data, official.data)
    assert.deepEqual(actual.history, official.history)
    assert.deepEqual(actual.messages, official.messages)
  }

  const file = new VFile({path: "/tmp/readme.md"})
  const message = file.message("problem", {line: 2, column: 3}, "source:rule")
  assert.equal(message instanceof VFileMessage, true)
  assert.equal(message instanceof Error, true)
  assert.deepEqual(Object.keys(message), Object.keys(new OfficialVFile("x").message("problem", {line: 2, column: 3}, "source:rule")))
  assert.deepEqual({
    column: message.column,
    fatal: message.fatal,
    file: message.file,
    line: message.line,
    name: message.name,
    reason: message.reason,
    ruleId: message.ruleId,
    source: message.source,
  }, {
    column: 3,
    fatal: false,
    file: "/tmp/readme.md",
    line: 2,
    name: "/tmp/readme.md:2:3",
    reason: "problem",
    ruleId: "rule",
    source: "source",
  })
  assert.equal(createVFileMessage("standalone", {}).name, "1:1")
  const deleted = createVFileMessage("standalone", {})
  delete deleted.name
  assert.equal(deleted.name, "")
})

test("pure Lil VFile preserves path validation", () => {
  const file = new VFile()
  assert.throws(() => {
    file.basename = "a/b"
  }, /cannot be a path/)
  assert.throws(() => {
    file.extname = "txt"
  }, /requires `path`/)
  file.path = "/a.txt"
  assert.throws(() => {
    file.extname = "txt"
  }, /must start with/)
  assert.throws(() => {
    file.extname = ".tar.gz"
  }, /multiple dots/)
})

test("CommonJS exposes the pure Lil VFile subpath", () => {
  const commonjs = require("@itslil/unified/vfile")
  assert.deepEqual(Object.keys(commonjs).sort(), [
    "VFile",
    "VFileMessage",
    "createVFileMessage",
  ])
  assert.equal(new commonjs.VFile("value").toString(), "value")
})

test("pure Lil constructors and prototypes match upstream", () => {
  assert.equal(VFile.name, OfficialVFile.name)
  assert.equal(VFile.length, OfficialVFile.length)
  assert.equal(VFileMessage.length, 3)
  assert.equal(Object.getPrototypeOf(VFile.prototype), Object.prototype)
  assert.equal(Object.getPrototypeOf(VFileMessage), Error)
  assert.equal(Object.getPrototypeOf(VFileMessage.prototype), Error.prototype)
  assert.equal(Object.getOwnPropertyDescriptor(VFile, "prototype").writable, false)
  assert.equal(Object.getOwnPropertyDescriptor(VFileMessage, "prototype").writable, false)
  assert.deepEqual(Reflect.ownKeys(VFile.prototype), Reflect.ownKeys(OfficialVFile.prototype))
  assert.throws(() => VFile("x"), /cannot be invoked without 'new'/)
  assert.throws(() => VFileMessage("x"), /cannot be invoked without 'new'/)
  for (const name of ["message", "fail", "info", "toString"]) {
    const descriptor = Object.getOwnPropertyDescriptor(VFile.prototype, name)
    assert.deepEqual({configurable: descriptor.configurable, enumerable: descriptor.enumerable, writable: descriptor.writable}, {configurable: true, enumerable: false, writable: true})
    assert.deepEqual([VFile.prototype[name].name, VFile.prototype[name].length], [OfficialVFile.prototype[name].name, OfficialVFile.prototype[name].length])
  }
  for (const name of ["basename", "dirname", "extname", "path", "stem"]) {
    const actual = Object.getOwnPropertyDescriptor(VFile.prototype, name)
    const official = Object.getOwnPropertyDescriptor(OfficialVFile.prototype, name)
    assert.deepEqual([actual.get.name, actual.set.name], [official.get.name, official.set.name])
  }
})

test("pure Lil VFile matches official ordered path options", () => {
  const options = {stem: "example", extname: ".md", dirname: "~"}
  const actual = new VFile(options)
  const official = new OfficialVFile(options)
  assert.deepEqual(actual.history, official.history)
  assert.equal(actual.path, official.path)
  assert.equal(actual.dirname, official.dirname)
  assert.equal(actual.basename, official.basename)
  assert.equal(actual.stem, official.stem)
  assert.equal(actual.extname, official.extname)

  actual.dirname = undefined
  official.dirname = undefined
  actual.extname = undefined
  official.extname = undefined
  assert.deepEqual(actual.history, official.history)
})

test("pure Lil VFile supports URLs, encodings, and custom fields", () => {
  const url = new URL("file:///tmp/a%20b.md")
  const custom = []
  const actual = new VFile({path: url, custom, cwd: "/"})
  assert.equal(actual.path, "/tmp/a b.md")
  assert.equal(actual.custom, custom)
  assert.equal(actual.cwd, "/")
  assert.equal(new VFile(new Uint8Array([0xef, 0xbb, 0xbf, 97])).toString(), "a")
  assert.equal(new VFile(new Uint8Array([0xfe, 0xff, 0, 97])).toString("utf-16be"), "a")
  assert.throws(() => new VFile(new URL("https://example.com")), /scheme file/)
  assert.throws(() => new VFile(new URL("file://example.com/a")), /File URL host/)
  assert.throws(() => new VFile(new URL("file:///a%2Fb")), /encoded/)
})

test("pure Lil VFile diagnostics match official messages", () => {
  const node = {
    type: "text",
    position: {start: {line: 2, column: 3}, end: {line: 2, column: 5}},
  }
  const cause = new Error("cause")
  const options = {ancestors: [node], cause, ruleId: "rule", source: "source"}
  for (const place of [undefined, node, node.position, node.position.start, options]) {
    const actual = new VFile().message("problem", place)
    const official = new OfficialVFile().message("problem", place)
    for (const key of ["ancestors", "cause", "column", "fatal", "file", "line", "message", "name", "place", "reason", "ruleId", "source", "actual", "expected", "note", "url"]) {
      assert.deepEqual(actual[key], official[key], key)
    }
    assert.equal(String(actual), String(official))
  }

  const file = new VFile({path: "/tmp/a.md"})
  assert.equal(file.info("note").fatal, undefined)
  assert.throws(() => file.fail("stop"), (error) => error instanceof VFileMessage && error.fatal === true)
  assert.equal(file.messages.length, 2)
})

test("pure Lil VFile rejects invalid path parts at the same evaluation point", () => {
  for (const field of ["basename", "stem", "extname"]) {
    for (const value of [true, 7, {}]) {
      const actual = new VFile({path: "/a.md"})
      const official = new OfficialVFile({path: "/a.md"})
      assert.throws(() => {
        official[field] = value
      }, TypeError)
      assert.throws(() => {
        actual[field] = value
      }, TypeError)
      assert.deepEqual(actual.history, official.history)
    }
  }
})
