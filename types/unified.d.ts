export interface VFile {
  value?: string | Uint8Array
  result?: unknown
  messages: unknown[]
  data: Record<string, unknown>
  message: (...args: unknown[]) => unknown
  toString: (encoding?: string) => string
}

export type Parser = (doc: string, file: VFile) => unknown
export type Compiler = (tree: unknown, file: VFile) => unknown
export type Transformer = (
  tree: unknown,
  file: VFile,
  next?: (error?: unknown, tree?: unknown, file?: VFile) => void
) => unknown
export type Plugin = (this: Processor, ...parameters: unknown[]) => void | Transformer

export interface Processor {
  use(value?: unknown, ...parameters: unknown[]): Processor
  parse(file?: VFile | string): unknown
  run(tree: unknown, done: (error?: unknown, tree?: unknown, file?: VFile) => void): undefined
  run(
    tree: unknown,
    file: VFile | string | undefined,
    done: (error?: unknown, tree?: unknown, file?: VFile) => void
  ): undefined
  run(tree: unknown, file?: VFile | string): Promise<unknown>
  runSync(tree: unknown, file?: VFile | string): unknown
  stringify(tree: unknown, file?: VFile | string): unknown
  process(file: VFile | string | undefined, done: (error?: unknown, file?: VFile) => void): undefined
  process(file?: VFile | string): Promise<VFile>
  processSync(file?: VFile | string): VFile
  data(): Record<string, unknown>
  data(key: string): unknown
  data(dataset: Record<string, unknown>): Processor
  data(key: string, value: unknown): Processor
  freeze(): Processor
  attachers: unknown[]
  parser?: Parser
  compiler?: Compiler
  Parser?: Parser
  Compiler?: Compiler
}

export const unified: Processor
export default unified
