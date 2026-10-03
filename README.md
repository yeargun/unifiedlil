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
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. Public and extern property names are preserved; eligible internal owned properties may be mangled. ESM export names stay so the lane is testable. |

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

The compiler writes the ESM, CommonJS and UMD files directly. Native Node imports are declared in the staged source graph; browser and worker entries use the portable shims. Format wrappers and module linking are part of compiler delivery, with no post-compilation JavaScript minifier.

ESM, CommonJS, UMD, and closed artifacts directly contain the pure LilScript
VFile runtime. VFile-compatible inputs retain their identity in every format.
The same implementation is available as `@itslil/unified/vfile` in ESM and
CommonJS.

The current public comparison is generated from independently targeted raw, gzip and Brotli artifacts. See [COMPARISON.md](COMPARISON.md) and [package files and validation](site/package-build.json).

`src/entry.lil` imports `src/vfile.lil` directly, so processor, trough, VFile,
parser-facing values, and stringifier-facing values form one LilScript graph
before code generation. `npm run check:sources` verifies the pinned SHA-256
mapping shared with remark. `npm run measure:graph` compares that unmodified
output with the complete official browser graph compressed by Terser 5.51.2.

The LilScript compiler lives next door at `../lilscript`.


## Comparison with the original

See [COMPARISON.md](COMPARISON.md) for current size and build-time comparisons against minified upstream.

[Download the checked repository package](https://yeargun.github.io/unifiedlil/downloads/package.tgz) · [Package files, hashes and validation](https://yeargun.github.io/unifiedlil/package-build.json). npm publication is independent.
