import {createRequire} from "node:module"
import {brotliCompressSync, constants as zlibConstants, gzipSync} from "node:zlib"
import {build} from "esbuild"
import {minify} from "terser"

const require = createRequire(import.meta.url)

function size(code) {
  const bytes = typeof code === "string" ? Buffer.from(code) : code
  return {
    raw: bytes.byteLength,
    gzip9: gzipSync(bytes, {level: 9}).byteLength,
    brotli11: brotliCompressSync(bytes, {
      params: {[zlibConstants.BROTLI_PARAM_QUALITY]: 11},
    }).byteLength,
  }
}

function componentName(path) {
  if (path.includes("dist/unified")) return "@itslil/unified"
  if (path.includes("dist/vfile")) return "@itslil/unified/vfile"
  const marker = "node_modules/"
  const index = path.lastIndexOf(marker)
  if (index < 0) return path
  const name = path.slice(index + marker.length).split("/")
  return name[0].startsWith("@") ? `${name[0]}/${name[1]}` : name[0]
}

async function bundle(entry, options = {}) {
  return build({
    bundle: true,
    conditions: ["browser", "import"],
    entryPoints: [entry],
    format: "esm",
    legalComments: "none",
    metafile: true,
    platform: "browser",
    write: false,
    ...options,
  })
}

function components(metafile) {
  const totals = new Map()
  for (const output of Object.values(metafile.outputs)) {
    for (const [path, input] of Object.entries(output.inputs)) {
      const name = componentName(path)
      totals.set(name, (totals.get(name) ?? 0) + input.bytesInOutput)
    }
  }
  return Object.fromEntries([...totals].sort((a, b) => b[1] - a[1]))
}

const officialBundle = await bundle("unified")
const officialCode = officialBundle.outputFiles[0].text
const officialTerserMangle = await minify(officialCode, {
  compress: true,
  mangle: true,
  module: true,
})
const officialTerserNoMangle = await minify(officialCode, {
  compress: true,
  mangle: false,
  module: true,
})
const officialEsbuild = await bundle("unified", {minify: true, metafile: false})
const itslilBundle = await bundle("./dist/unified.esm.js")
const closedBundle = await bundle("./dist/unified.closed.js")

console.log(JSON.stringify({
  tools: {
    esbuild: require("esbuild/package.json").version,
    terser: require("terser/package.json").version,
  },
  official: {
    graph: size(officialCode),
    terserMangle: size(officialTerserMangle.code),
    terserNoMangle: size(officialTerserNoMangle.code),
    esbuildMinify: size(officialEsbuild.outputFiles[0].contents),
    components: components(officialBundle.metafile),
  },
  itslil: {
    graph: size(itslilBundle.outputFiles[0].contents),
    components: components(itslilBundle.metafile),
  },
  closed: {
    graph: size(closedBundle.outputFiles[0].contents),
    components: components(closedBundle.metafile),
  },
}, null, 2))
