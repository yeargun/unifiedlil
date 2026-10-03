import { execFileSync } from "node:child_process"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const json = execFileSync("npm", ["pack", "--dry-run", "--json"], { encoding: "utf8" })
const result = JSON.parse(json)[0]
const file = "unified"
const required = new Set([
  `dist/${file}.esm.js`,
  `dist/${file}.cjs`,
  `dist/${file}.umd.js`,
  `dist/${file}.closed.js`,
  `dist/${file}.d.ts`,
  "dist/vfile.esm.js",
  "dist/vfile.cjs",
  "types/vfile.d.ts",
  "LICENSE",
  "NOTICE.md",
  "README.md",
])
const files = new Set(result.files.map(({ path }) => path))
for (const path of required) {
  if (!files.has(path)) throw new Error(`npm tarball is missing ${path}`)
}
const manifest = JSON.parse(readFileSync("package.json", "utf8"))
if (manifest.name !== "@itslil/unified") throw new Error("unexpected package name")
for (const format of ["esm.js", "cjs", "umd.js", "closed.js"]) {
  assert.doesNotMatch(readFileSync(`dist/${file}.${format}`, "utf8"), /(?:from|require\()\s*["']vfile["']/)
}
const dependencies = Object.keys(manifest.dependencies ?? {}).sort()
if (dependencies.join(",") !== "unified,vfile") {
  throw new Error(`unexpected dependencies: ${dependencies.join(", ")}`)
}
console.log(`npm pack: ${result.entryCount} files, ${result.size} bytes packed, ${result.unpackedSize} bytes unpacked`)
