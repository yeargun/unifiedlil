# @itslil/unified

unified processor reimplemented in LilScript. This is **not** the official [`unified`](https://github.com/unifiedjs/unified) package.

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

The LilScript compiler lives next door at `../lilscript`.
