import type {Node} from "unist"
import type {VFile} from "vfile"
import {
  unified,
  type Plugin,
  type Processor,
  type TransformCallback,
} from "@itslil/unified"
import {
  VFile as LilVFile,
  VFileMessage as LilVFileMessage,
  createVFileMessage,
} from "@itslil/unified/vfile"
// @ts-expect-error: unified 11 has no default export.
import unifiedDefault from "@itslil/unified"

declare function expectType<T>(value: T): void

void unifiedDefault
expectType<VFile>(new LilVFile("text"))
expectType<LilVFileMessage>(createVFileMessage("reason"))

interface Parsed extends Node {
  type: "parsed"
  value: string
}

interface Rendered {
  kind: "rendered"
}

declare module "@itslil/unified" {
  interface CompileResultMap {
    Rendered: Rendered
  }

  interface Data {
    typed?: boolean | undefined
  }
}

const parse: Plugin<[], string, Parsed> = function () {
  this.parser = (document, file) => {
    expectType<string>(document)
    expectType<VFile>(file)
    return {type: "parsed", value: document}
  }
}

const compile: Plugin<[], Parsed, Rendered> = function () {
  this.compiler = () => ({kind: "rendered"})
}

const processor = unified().use(parse).use(compile)
expectType<Processor<Parsed, undefined, undefined, Parsed, Rendered>>(processor)
expectType<Parsed>(processor.parse("text"))
expectType<Rendered>(processor.stringify({type: "parsed", value: "text"}))
expectType<VFile & {result: Rendered}>(processor.processSync("text"))
expectType<boolean | undefined>(processor.data("typed"))

const optionsPlugin: Plugin<[{enabled: boolean}]> = function (options) {
  expectType<boolean>(options.enabled)
}

// @ts-expect-error: required plugin options are missing.
unified().use(optionsPlugin)
unified().use(optionsPlugin, {enabled: true})
// @ts-expect-error: the option shape does not match.
unified().use(optionsPlugin, {other: true})

unified().use(function () {
  return function (_tree, _file, next) {
    expectType<TransformCallback>(next)
  }
})
