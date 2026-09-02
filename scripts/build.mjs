import {
  accessSync,
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

function compileLil(compiler, sourceName, configName, outputName) {
  run(compiler, [
    resolve(root, "src", sourceName),
    "--target",
    "js-module",
    "--config",
    resolve(root, configName),
    "-o",
    resolve(dist, outputName),
  ])
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
  compileLil(compiler, "entry.lil", "lilscript.toml", `${file}.raw.js`)
  compileLil(compiler, "entry.lil", "lilscript.closed.toml", `${file}.closed.js`)
  compileLil(compiler, "vfile.lil", "lilscript.toml", "vfile.raw.js")
}

compileIfRequested()
mkdirSync(dist, { recursive: true })

const rawPath = resolve(dist, `${file}.raw.js`)
if (!existsSync(rawPath)) {
  throw new Error(`dist/${file}.raw.js is missing. Run with --compile after building LilScript.`)
}

function filterExports(source, keep) {
  return source.replace(/export\s*\{([^}]*)\}/g, (_, body) => {
    const entries = body.split(",").filter((entry) => {
      const parts = entry.trim().split(/\s+as\s+/)
      return keep.includes(parts[parts.length - 1])
    })
    return entries.length ? `export{${entries.join(",")}}` : ""
  })
}

writeFileSync(
  resolve(dist, `${file}.esm.js`),
  filterExports(`${banner}${readFileSync(rawPath, "utf8").trimEnd()}\n`, ["unified"]),
)
const closedPath = resolve(dist, `${file}.closed.js`)
writeFileSync(
  closedPath,
  filterExports(`${banner}${readFileSync(closedPath, "utf8").trimEnd()}\n`, ["unified"]),
)
const vfileBanner = "/*! @itslil/unified vfile browser runtime | LilScript reimplementation of vfile@6.0.3 | MIT */\n"
const vfileRawPath = resolve(dist, "vfile.raw.js")
if (!existsSync(vfileRawPath)) {
  throw new Error("dist/vfile.raw.js is missing. Run with --compile after building LilScript.")
}
writeFileSync(
  resolve(dist, "vfile.esm.js"),
  filterExports(`${vfileBanner}${readFileSync(vfileRawPath, "utf8").trimEnd()}\n`, [
    "VFile",
    "VFileMessage",
    "createVFileMessage",
  ]),
)

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
