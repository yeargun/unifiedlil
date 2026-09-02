# Notices

`@itslil/unified` is an independent LilScript reimplementation of
[`unified`](https://github.com/unifiedjs/unified). It is not affiliated with or
endorsed by the upstream authors.

Algorithms and public API names derive from that project, distributed under
the MIT license. Behavior from official `trough`, `vfile`, `extend`,
`is-plain-obj`, `bail`, and `devlop` is vendored in LilScript. The original
license notice is preserved in [LICENSE](./LICENSE).

All builds directly compose the pure LilScript `vfile@6.0.3` algorithms.
Already-created VFile-compatible objects are passed through unchanged.

The LilScript compiler is developed separately at
[yeargun/lilscript](https://github.com/yeargun/lilscript).
