import {createHash} from "node:crypto"
import {readFileSync} from "node:fs"
import {dirname, resolve} from "node:path"
import {fileURLToPath} from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const mappings = [
  ["entry.lil", "ccfd14e7bcc6aeca1a01f095e01c23457792ef7ffe2a01d11d3d74349a9620e1"],
  ["extend.lil", "5612b854f838998e9a0a78f43ae6bbcbe9e047558611e4f9787075debd4afc64"],
  ["host.lil", "a5d9a8b45adedcde57dcfb5fa27105037840c0b7a5c1e33a59f302cc618a914c"],
  ["plain.lil", "903533b020487768987eff2dfb90a0593b9c9008b998da6833baae7faa309c58"],
  ["trough.lil", "0aca356ccbd1e212aeea1de55a1dde4f5dc6e0bff518f613ae76fa32cea1acf0"],
  ["vfile.lil", "8f00dd9d7a32402c6d7611c82456191a446ff2a4257d239307fbe7dd88263797"],
]

for (const [name, expected] of mappings) {
  const path = resolve(root, "src", name)
  const actual = createHash("sha256").update(readFileSync(path)).digest("hex")
  if (actual !== expected) {
    throw new Error(`${path}: expected sha256 ${expected}, got ${actual}`)
  }
}

console.log(`checked ${mappings.length} pinned shared Lil sources`)
