// Record this release's numbers in site/results.json, so the Pages site cannot drift from the build.
//
//   LILSCRIPT_COMPILER=<lilscript> LILSCRIPT_CODEC=<lilscript-codec> LILSCRIPT_REVISION=<compiler source revision> \
//     npm run record:release [-- --samples 3]
//
// 1. Builds the port `samples` times (scripts/build.mjs --compile) and records the wall time of the
//    build's compiler invocations (the build appends them to UNIFIEDLIL_COMPILE_TIMING).
// 2. Measures every delivered file with the LilScript codec (gzip-9, Brotli-11) and says which
//    delivered files the compiler wrote.
// 3. Measures document throughput of the delivered ESM against official unified in this Node.
//
// Every hash is of a file on disk at the moment of the run. The official rows (Terser, esbuild, Oxc)
// come from the paired source build of unified's pinned Git revision (comparison/source-build/) and,
// like `previousRelease`, are left as they are.
import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { cpus, loadavg, tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { performance } from "node:perf_hooks"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const argv = process.argv.slice(2)
const flag = (name, fallback = null) => {
  const at = argv.indexOf(`--${name}`)
  return at === -1 ? fallback : argv[at + 1]
}
const compiler = process.env.LILSCRIPT_COMPILER
const codec = process.env.LILSCRIPT_CODEC
if (!compiler || !codec) throw new Error("set LILSCRIPT_COMPILER and LILSCRIPT_CODEC")
const revision = flag("revision", process.env.LILSCRIPT_REVISION)
if (!revision) throw new Error("set LILSCRIPT_REVISION (or pass --revision) to the compiler's source revision")
const sampleCount = Number(flag("samples", "3"))

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex")
const work = mkdtempSync(join(tmpdir(), "unifiedlil-release-"))

// 1. Compile time. The host is shared, so its load is recorded next to the samples.
const timingLog = join(work, "timing.jsonl")
const loadAverage1m = loadavg()[0]
for (let sample = 0; sample < sampleCount; sample++) {
  execFileSync(process.execPath, [join(root, "scripts", "build.mjs"), "--compile"], {
    cwd: root,
    env: { ...process.env, UNIFIEDLIL_COMPILE_TIMING: timingLog },
    stdio: ["ignore", "ignore", "inherit"],
  })
}
const builds = readFileSync(timingLog, "utf8").trim().split("\n").map((line) => JSON.parse(line))
const round = (value) => Math.round(value * 10) / 10
const invocations = builds[0].invocations.map((entry, index) => ({
  source: entry.source,
  config: entry.config,
  wallMs: builds.map((b) => round(b.invocations[index].wallMs)),
}))

// 2. Sizes.
function measure(paths) {
  const report = JSON.parse(execFileSync(codec, ["--json", ...paths], { encoding: "utf8" }))
  return report.artifacts.map(({ raw, gzip9, brotli11 }) => ({ raw, gzip9, brotli11 }))
}
const esbuildLabel = "post-processed by esbuild (format conversion of the compiler's ESM, not minified), not compiler-written"
const deliveredFiles = [
  ["dist/unified.esm.js", "ESM (npm import, browser)", "compiler"],
  ["dist/unified.closed.js", "closed-world ESM", "compiler"],
  ["dist/vfile.esm.js", "@itslil/unified/vfile ESM", "compiler"],
  ["dist/unified.cjs", "CommonJS (npm require)", esbuildLabel],
  ["dist/unified.umd.js", "UMD / IIFE (unpkg, jsdelivr)", esbuildLabel],
  ["dist/vfile.cjs", "@itslil/unified/vfile CommonJS", esbuildLabel],
]
const deliveredSizes = measure(deliveredFiles.map(([path]) => resolve(root, path)))
const delivered = deliveredFiles.map(([file, role, writtenBy], index) => ({
  file,
  role,
  writtenBy,
  compilerWritten: writtenBy === "compiler",
  sha256: sha256(resolve(root, file)),
  ...deliveredSizes[index],
}))

// 3. Throughput: the playground's pipeline (parser, one transformer, compiler) over a 400-line
// document, processSync; each sample is 25 documents, quiet median of 60 samples after discarding 3.
const documentText = Array.from({ length: 400 }, (_, i) => (i % 5 === 0 ? `# heading ${i}` : `line ${i} of the document`)).join("\n")
function pipeline(unified) {
  return unified().use(function plugin() {
    this.parser = (doc) => ({
      type: "root",
      children: String(doc)
        .split(/\n+/)
        .filter(Boolean)
        .map((value) => ({ type: "paragraph", children: [{ type: "text", value }] })),
    })
    this.compiler = (tree) => tree.children.map((node) => node.children[0].value).join("\n")
    return (tree) => {
      for (const node of tree.children) {
        const text = node.children[0]
        if (text.value.startsWith("# ")) text.value = text.value.slice(2).toUpperCase()
      }
      return tree
    }
  })
}
// The two lanes alternate sample by sample, so load on the host falls on both alike.
function throughput(lanes) {
  const runs = lanes.map((unified) => {
    const processor = pipeline(unified)
    return { processor, expected: String(processor.processSync(documentText).value), times: [] }
  })
  for (let i = 0; i < 63; i++) {
    for (const run of runs) {
      let out
      const start = performance.now()
      for (let j = 0; j < 25; j++) out = run.processor.processSync(documentText)
      run.times.push((performance.now() - start) / 25)
      if (String(out.value) !== run.expected) throw new Error("pipeline output changed between runs")
    }
  }
  return runs.map((run) => {
    const quiet = run.times.slice(3).sort((a, b) => a - b)
    return { ms: quiet[Math.floor(quiet.length / 2)], out: run.expected }
  })
}
const official = await import("unified")
const lil = await import(pathToFileURL(resolve(root, "dist", "unified.esm.js")).href)
const [officialRun, lilRun] = throughput([official.unified, lil.unified])
if (officialRun.out !== lilRun.out) throw new Error("throughput workload output differs from official unified")

rmSync(work, { recursive: true, force: true })

// Write results.json.
const resultsPath = resolve(root, "site", "results.json")
const results = JSON.parse(readFileSync(resultsPath, "utf8"))
const byId = new Map(results.size.map((row) => [row.id, row]))
const esm = delivered.find((row) => row.file === "dist/unified.esm.js")
const closed = delivered.find((row) => row.file === "dist/unified.closed.js")
Object.assign(byId.get("itslil"), { raw: esm.raw, gzip9: esm.gzip9, brotli11: esm.brotli11 })
Object.assign(byId.get("itslil-closed"), { raw: closed.raw, gzip9: closed.gzip9, brotli11: closed.brotli11 })

const codecReport = JSON.parse(execFileSync(codec, ["--json", resolve(root, "package.json")], { encoding: "utf8" }))
const bar = results.size.find((row) => row.baseline)
const { gzip9, brotli11 } = codecReport.codecs
results.codec = `lilscript-codec: zlib ${gzip9.libraryVersion} gzip-${gzip9.level} / Google Brotli ${brotli11.libraryVersion} quality ${brotli11.quality}, lgwin ${brotli11.lgwin}`
results.node = process.version
results.runtime = `Node ${process.version}`
results.throughput = [
  { id: "official", name: "unified@11.0.5", documentMs: officialRun.ms },
  { id: "itslil", name: "@itslil/unified", documentMs: lilRun.ms },
]
results.throughputWorkload =
  "processSync of the playground pipeline (parser, one transformer, compiler) over a 400-line document, 25 documents per sample, the two lanes alternating; both produce the same output"
results.delivered = delivered
results.compiler = {
  revision,
  binarySha256: sha256(compiler),
  codecSha256: sha256(codec),
  compileWallMs: builds.map((b) => round(b.totalMs)),
  invocations,
  timingScope: `wall time of the build's ${invocations.length} compiler invocations, each spawned by scripts/build.mjs; ${sampleCount} builds`,
  host: { cpus: cpus().length, loadAverage1m: Math.round(loadAverage1m * 10) / 10 },
  date: new Date().toISOString().slice(0, 10),
}
writeFileSync(resultsPath, `${JSON.stringify(results, null, 2)}\n`)
console.log(
  `recorded: ESM ${esm.brotli11} B Brotli-11 (bar ${bar.brotli11}); ` +
    `compile ${results.compiler.compileWallMs.join(" / ")} ms; ` +
    `throughput ${lilRun.ms.toFixed(3)} ms vs official ${officialRun.ms.toFixed(3)} ms`,
)
