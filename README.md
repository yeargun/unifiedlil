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
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. `extern class` keys may mangle. ESM export names stay so the lane is testable. |

You publish the library lane. The closed artifact is `dist/unified.closed.js`.

ESM, CommonJS, UMD, and closed artifacts directly contain the pure LilScript
VFile runtime. VFile-compatible inputs retain their identity in every format.
The same implementation is available as `@itslil/unified/vfile` in ESM and
CommonJS.

`src/entry.lil` imports `src/vfile.lil` directly, so processor, trough, VFile,
parser-facing values, and stringifier-facing values form one LilScript graph
before code generation. `npm run check:sources` verifies the pinned SHA-256
mapping shared with remark. `npm run measure:graph` compares that unmodified
output with the complete official browser graph compressed by Terser 5.51.2.

The LilScript compiler lives next door at `../lilscript`.
