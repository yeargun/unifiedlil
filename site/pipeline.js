import { unified } from "./unified.js"
import { remarkParse } from "./vendor/remark-parse.js"
import { remarkGfm } from "./vendor/remark-gfm.js"
import { remarkBreaks } from "./vendor/remark-breaks.js"
import { remarkMath } from "./vendor/remark-math.js"
import { remarkRehype } from "./vendor/remark-rehype.js"
import rehypeKatex from "./vendor/rehype-katex.js"
import { rehypeStringify } from "./vendor/rehype-stringify.js"

const input = document.getElementById("input")
const output = document.getElementById("output")
const frame = document.getElementById("frame")
const samples = document.getElementById("samples")

const docs = [
  {
    label: "GFM",
    value: `# Pipeline

- [x] tables
- [ ] tasks

| pkg | role |
| --- | --- |
| remark-gfm | tables · tasks · strike |
| remark-breaks | soft newlines |

Autolink: https://yeargun.github.io/unifiedlil/
`,
  },
  {
    label: "breaks + math",
    value: `Line one
line two becomes a break.

Inline $E=mc^2$ and a block:

$$
\\frac{a}{b} = \\sqrt{\\alpha}
$$
`,
  },
  {
    label: "prose",
    value: `Hello **bold**, *em*, and \`code\`.

> quoted

[lab](https://yeargun.github.io/unifiedlil/)
`,
  },
]

function processor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex, { throwOnError: false })
    .use(rehypeStringify, { allowDangerousHtml: true })
}

function render() {
  try {
    const file = processor().processSync(input.value)
    const html = String(file.value ?? file.result ?? "")
    output.textContent = html
    frame.srcdoc = `<!doctype html><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"><style>body{font:16px/1.55 system-ui;margin:16px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:6px 8px}blockquote{border-left:3px solid #e3b341;padding-left:12px;color:#555}</style>${html}`
  } catch (error) {
    output.textContent = String(error && error.message ? error.message : error)
    frame.srcdoc = ""
  }
}

for (const item of docs) {
  const button = document.createElement("button")
  button.type = "button"
  button.textContent = item.label
  button.addEventListener("click", () => {
    input.value = item.value
    render()
  })
  samples.append(button)
}

input.value = docs[1].value
input.addEventListener("input", render)
render()
