function $(id) { return document.getElementById(id) }
function copyButtons() {
  for (const button of document.querySelectorAll("[data-copy]")) {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy)
      button.textContent = "copied"
      setTimeout(() => { button.textContent = "copy" }, 1200)
    })
  }
}
function samples(items, apply) {
  const root = $("samples")
  for (const item of items) {
    const button = document.createElement("button")
    button.type = "button"
    button.textContent = item.label
    button.addEventListener("click", () => apply(item.value))
    root.append(button)
  }
}
function showText(value) {
  $("output").hidden = false
  $("output").textContent = value
  $("preview").hidden = true
  $("frame").hidden = true
}
function showHtml(html) {
  $("output").hidden = false
  $("output").textContent = html
  $("preview").hidden = true
  $("frame").hidden = false
  $("frame").srcdoc = `<!doctype html><style>body{font:16px/1.55 system-ui;margin:16px}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:6px 8px}blockquote{border-left:3px solid #e3b341;padding-left:12px;color:#555}</style>${html}`
}
function showPreview(html) {
  $("output").hidden = false
  $("preview").hidden = false
  $("frame").hidden = true
  $("preview").innerHTML = html
}
copyButtons()

import { unified } from "./unified.js"
function headingPlugin() {
  this.parser = (doc) => ({
    type: "root",
    children: String(doc).split(/\n+/).filter(Boolean).map((value) => ({ type: "paragraph", children: [{ type: "text", value }] })),
  })
  this.compiler = (tree) => (tree.children ?? []).map((node) => node.children?.[0]?.value ?? "").join("\n")
  return (tree) => {
    for (const node of tree.children ?? []) {
      const text = node.children?.[0]
      if (text && String(text.value).startsWith("# ")) text.value = String(text.value).slice(2).toUpperCase()
    }
    return tree
  }
}
const input = $("input")
samples([
  { label: "heading", value: "# unified\nplugins run in order" },
  { label: "lines", value: "one\ntwo\nthree" },
], (value) => { input.value = value; render() })
input.value = "# hi\nfrom @itslil/unified"
const processor = unified().use(headingPlugin)
function render() {
  try {
    const file = processor.processSync(input.value)
    showText(String(file.result ?? file.value ?? ""))
  } catch (error) {
    showText(String(error))
  }
}
input.addEventListener("input", render)
render()
