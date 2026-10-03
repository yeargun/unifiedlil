# Current comparison with the original

Portable unified processor main entry. Original bundling preserves runtime names required by upstream VFile constructor-name checks; all minifier lanes pass the same 195 checks. Node and browser package variants are tested separately.

Each compression row uses a separate LilScript compilation targeting that objective. Original results are the smallest of Terser, esbuild and Oxc for the named codec.

| Objective | LilScript bytes | Original minified bytes | Original minifier | LilScript build (s) | Original bundle + minify (s) |
|---|---:|---:|---|---:|---:|
| raw | 11,667 | 14,375 | Oxc | 4.274 | 0.185 |
| gzip | 4,457 | 5,264 | Oxc | 3.973 | 0.185 |
| brotli | 4,041 | 4,791 | Terser | 10.233 | 0.380 |

Original version: `unified@11.0.5`. gzip level 9; Brotli quality 11/window 22. Each time is one sequential fresh-output build on the recorded shared machine. Original timing starts from installed ESM and does not include the original repository’s TypeScript compilation. Dependency installation, tests and final file compression are excluded.

Validation: 585 checks across raw, gzip and Brotli main entries. This does not cover every package format or establish complete upstream API equivalence.

[Artifacts, hashes and settings](site/comparison.json) · [Commands, source identities and timings](site/comparison-builds.json) · [Exact checked source inputs](site/comparison-artifacts/sources.tar.gz).
