import {
  accessSync,
  appendFileSync,
  constants,
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { performance } from "node:perf_hooks"
import { build as esbuild } from "esbuild"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const lilscriptRoot = process.env.LILSCRIPT_ROOT ?? resolve(root, "..", "lilscript")
const dist = resolve(root, "dist")
const file = "unified"
const banner = "/*! @itslil/unified 11.0.6 | LilScript reimplementation of unified | MIT */\n"

function compilerPath() {
  const candidates = [
    process.env.LILSCRIPT_COMPILER,
    resolve(lilscriptRoot, "target", "release", "lilscript"),
    resolve(lilscriptRoot, "target", "debug", "lilscript"),
  ].filter(Boolean)
  for (const candidate of candidates) {
    try {
      accessSync(candidate, constants.X_OK)
      return candidate
    } catch {}
  }
  return null
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit" })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

// Wall time of each compiler invocation. `UNIFIEDLIL_COMPILE_TIMING=<file>` appends one JSON line per
// build; scripts/record-release.mjs reads it for the compile times the Pages site shows.
const compileTimings = []

function compileLil(compiler, sourceName, configName, outputName) {
  const start = performance.now()
  run(compiler, [
    resolve(root, "src", sourceName),
    "--target",
    "js-module",
    "--config",
    resolve(root, configName),
    "-o",
    resolve(dist, outputName),
  ])
  const wallMs = performance.now() - start
  compileTimings.push({ source: `src/${sourceName}`, config: configName, wallMs })
  console.log(`compiled src/${sourceName} with ${configName} in ${wallMs.toFixed(1)} ms`)
}

function compileIfRequested() {
  if (!process.argv.includes("--compile") && existsSync(resolve(dist, `${file}.raw.js`))) {
    return
  }
  const compiler = compilerPath()
  if (!compiler) {
    throw new Error("LilScript compiler not found. Set LILSCRIPT_COMPILER or build lilscript.")
  }
  mkdirSync(dist, { recursive: true })
  // index.lil exports unified's public API only, so the compiler's artifact is the public module;
  // entry.lil keeps the runtime exports (VFileRuntime, ProcessorRuntime) that other ports link.
  compileLil(compiler, "index.lil", "lilscript.toml", `${file}.raw.js`)
  compileLil(compiler, "index.lil", "lilscript.closed.toml", `${file}.closed.raw.js`)
  compileLil(compiler, "vfile.lil", "lilscript.toml", "vfile.raw.js")
  if (process.env.UNIFIEDLIL_COMPILE_TIMING) {
    const totalMs = compileTimings.reduce((sum, entry) => sum + entry.wallMs, 0)
    appendFileSync(
      process.env.UNIFIEDLIL_COMPILE_TIMING,
      `${JSON.stringify({ compiler, totalMs, invocations: compileTimings })}\n`,
    )
  }
}

compileIfRequested()
mkdirSync(dist, { recursive: true })

// The ESM files ship exactly as the compiler wrote them, plus a license banner: no minifier or
// reprint runs over them (plan rule 6). index.lil exports only unified's public API and vfile.lil only
// the vfile API, so the compiler's export list is the published one; this checks it instead of
// rewriting it.
function exportedNames(source) {
  const names = []
  for (const [, body] of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const entry of body.split(",")) {
      const parts = entry.trim().split(/\s+as\s+/)
      if (parts[0]) names.push(parts[parts.length - 1])
    }
  }
  return names.sort()
}

function publish(rawName, name, publicBanner, keep) {
  const rawFile = resolve(dist, rawName)
  if (!existsSync(rawFile)) {
    throw new Error(`dist/${rawName} is missing. Run with --compile after building LilScript.`)
  }
  const source = readFileSync(rawFile, "utf8")
  const names = exportedNames(source)
  if (names.join(",") !== [...keep].sort().join(",")) {
    throw new Error(`dist/${rawName} exports ${names.join(", ")}; expected ${keep.join(", ")}`)
  }
  writeFileSync(resolve(dist, name), `${publicBanner}${source.trimEnd()}\n`)
}

publish(`${file}.raw.js`, `${file}.esm.js`, banner, ["unified"])
publish(`${file}.closed.raw.js`, `${file}.closed.js`, banner, ["unified"])
const vfileBanner = "/*! @itslil/unified vfile browser runtime | LilScript reimplementation of vfile@6.0.3 | MIT */\n"
publish("vfile.raw.js", "vfile.esm.js", vfileBanner, ["VFile", "VFileMessage", "createVFileMessage"])

// CommonJS and UMD: the compiler has no CommonJS or script-with-exports target yet, so these three
// files are esbuild format conversions of the compiler's ESM (no minification). They are labelled
// "post-processed by esbuild, not compiler-written" in site/results.json and on the site; replacing
// them with compiler-written files is plan task M12.2.
await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, `${file}.esm.js`)],
  outfile: resolve(dist, `${file}.cjs`),
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "node18",
  legalComments: "none",
  minifyIdentifiers: false,
  minifySyntax: false,
  banner: { js: banner },
  logLevel: "error",
})

await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, "vfile.esm.js")],
  outfile: resolve(dist, "vfile.cjs"),
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "node18",
  legalComments: "none",
  minifyIdentifiers: false,
  minifySyntax: false,
  banner: { js: vfileBanner },
  logLevel: "error",
})

await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, `${file}.esm.js`)],
  outfile: resolve(dist, `${file}.umd.js`),
  bundle: true,
  format: "iife",
  globalName: "unified",
  footer: {
    js: `globalThis.unified=unified.unified||unified;`,
  },
  legalComments: "none",
  minifyIdentifiers: false,
  minifySyntax: false,
  banner: { js: banner },
  logLevel: "error",
})

copyFileSync(resolve(root, "types", `${file}.d.ts`), resolve(dist, `${file}.d.ts`))
console.log(`wrote dist/${file}.esm.js, dist/${file}.cjs, dist/${file}.umd.js, dist/${file}.closed.js, dist/vfile.esm.js, dist/vfile.cjs`)
