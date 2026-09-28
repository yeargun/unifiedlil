# @itslil/unified



Official [`unified@11.0.5`](https://github.com/unifiedjs/unified) algorithms rewritten in LilScript. Official test suite 195/195. Not affiliated with upstream.

**Site:** [yeargun.github.io/unifiedlil/](https://yeargun.github.io/unifiedlil/) · **Pipeline lab:** [yeargun.github.io/unifiedlil/pipeline.html](https://yeargun.github.io/unifiedlil/pipeline.html)

```sh
npm install @itslil/unified
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. The compiler renames no properties yet, so `extern class` keys keep their names; the file differs from the library file only through its optimizer settings (candidate search `production`, no beam width). ESM export names stay so the lane is testable. |

You publish the library lane. The closed artifact is `dist/unified.closed.js`.

vfile imports `#minpath`, `#minproc` and `#minurl` per export condition:
`node:path`, `node:process` and `node:url`'s `fileURLToPath` under `node`, its own
small shims everywhere else. This package resolves the same way. Under `node`
(Node, Deno, Bun) `@itslil/unified` and `@itslil/unified/vfile` give
`dist/unified.node.js` and `dist/vfile.node.js`, which import those three Node
modules as vfile does; every other runtime (browsers, workers, edge runtimes,
React Native) gets `dist/unified.esm.js` and `dist/vfile.esm.js`, which carry the
shims. `test/environments.test.mjs` bundles upstream vfile and this package with
each runtime's conditions and compares the working directory, every path getter
and setter, file URLs and the errors they throw.

The ESM files (`dist/unified.esm.js`, `dist/unified.node.js`,
`dist/unified.closed.js`, `dist/vfile.esm.js`, `dist/vfile.node.js`) are exactly
what the compiler wrote, plus a license banner and, in the Node files, the three
Node imports; no minifier runs over them. The CommonJS files (`dist/unified.cjs`,
`dist/vfile.cjs`, for `require` under `node`) and the UMD file
(`dist/unified.umd.js`) are esbuild format conversions of the Node and default
ESM (not minified) because the compiler has no CommonJS target yet; the site
labels them as post-processed.

ESM, CommonJS, UMD, and closed artifacts directly contain the pure LilScript
VFile runtime. VFile-compatible inputs retain their identity in every format.
The same implementation is available as `@itslil/unified/vfile` in ESM and
CommonJS.

`npm run record:release` (with `LILSCRIPT_COMPILER`, `LILSCRIPT_CODEC` and
`LILSCRIPT_REVISION` set) rebuilds three times, times the compiler invocations,
measures every delivered file with the LilScript codec, and writes
`site/results.json`, which the site renders. The official bars come from the
paired source build recorded in `comparison/source-build/`.

`src/entry.lil` imports `src/vfile.lil` directly, so processor, trough, VFile,
parser-facing values, and stringifier-facing values form one LilScript graph
before code generation. `npm run check:sources` verifies the pinned SHA-256
mapping shared with remark. `npm run measure:graph` compares that unmodified
output with the complete official browser graph compressed by Terser 5.51.2.

The LilScript compiler lives next door at `../lilscript`.
