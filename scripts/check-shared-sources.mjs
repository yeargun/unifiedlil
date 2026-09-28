import {createHash} from "node:crypto"
import {readFileSync} from "node:fs"
import {dirname, resolve} from "node:path"
import {fileURLToPath} from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const mappings = [
  ["entry.lil", "baa802c68e7c54ef57c3023187f6a52ef16c186a234314010f4b18f71b263782"],
  ["extend.lil", "4055d2d1d1a84eb61b897c2f6d706c2c17d283df4d520a0620d18b753f340b12"],
  ["host.lil", "745c7baa0a9b13001eae15b75a8be9ea063a88a51945e56728522d44a331ee89"],
  ["plain.lil", "8a52a7e342eebf815c188da089eba5acaad37b604d13111a471f7437ed1d4249"],
  ["trough.lil", "9759f1e87e4d67fcd65b85963c2cbb6b5b206ac0212d4045bfb2c04125067eff"],
  ["vfile.lil", "b802ee848f32c20ffd2207d9e4b16b7aac257bd5445f0919dfc8b1b8c7b86e99"],
  ["vfile-imports.lil", "3b61b2a37ac0feac08c5af6c1910d6d2ca9f0a8bde7deb21607651d1965aa180"],
  ["browser/vfile-imports.lil", "17515fa203f6b6981aa3d6d3024ee2204605ca241493f833f523e2e8ca260b50"],
]

for (const [name, expected] of mappings) {
  const path = resolve(root, "src", name)
  const actual = createHash("sha256").update(readFileSync(path)).digest("hex")
  if (actual !== expected) {
    throw new Error(`${path}: expected sha256 ${expected}, got ${actual}`)
  }
}

console.log(`checked ${mappings.length} pinned shared Lil sources`)
