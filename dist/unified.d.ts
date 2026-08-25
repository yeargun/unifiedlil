export interface VFile {
  value?: string
  result?: unknown
  messages: unknown[]
  data: Record<string, unknown>
}

export type Parser = (doc: string, file: VFile) => unknown
export type Compiler = (tree: unknown, file: VFile) => unknown
export type Transformer = (tree: unknown, file: VFile) => unknown
export type Plugin = (this: Processor, options?: unknown) => void | Transformer

export interface Processor {
  use(plugin: Plugin, options?: unknown): Processor
  parse(file: VFile | string): unknown
  runSync(tree: unknown, file?: VFile | string): unknown
  run(tree: unknown, file?: VFile | string): Promise<unknown>
  stringify(tree: unknown, file?: VFile | string): unknown
  processSync(input: VFile | string): VFile
  process(input: VFile | string): Promise<VFile>
  data(): Record<string, unknown>
  data(key: string): unknown
  data(key: string, value: unknown): Processor
  parser?: Parser
  compiler?: Compiler
  Parser?: Parser
  Compiler?: Compiler
}

export function unified(): Processor
export default unified
