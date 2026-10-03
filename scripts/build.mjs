import {cp, mkdir, copyFile, readFile, writeFile} from 'node:fs/promises'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {buildPackage} from './compiler-package.mjs'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
for (const condition of ['browser', 'node']) {
  const stage = resolve(root, '.tmp/conditions', condition)
  await mkdir(stage, {recursive: true})
  await cp(resolve(root, 'src'), stage, {recursive: true})
  await copyFile(resolve(root, 'package-conditions/vfile.lil'), resolve(stage, 'vfile.lil'))
  await copyFile(resolve(root, `package-conditions/${condition}.lil`), resolve(stage, 'vfile-imports.lil'))
  if (condition === 'node') {
    const entry = resolve(stage, 'index.lil')
    const source = await readFile(entry, 'utf8')
    await writeFile(entry, 'import extern "node:path";\nimport extern "node:process";\nimport extern "node:url";\n' + source)
  }
}
await buildPackage({root,
  profiles: [{name:'public', config:'lilscript.toml'}, {name:'closed', config:'lilscript.closed.toml'}, {name:'node', config:'lilscript.node.toml'}],
  aliases: {"unified.raw.js": "unified.esm.js", "unified.closed.raw.js": "unified.closed.js", "vfile.raw.js": "vfile.esm.js"},
  assets: [{source:'types/unified.d.ts', destination:'unified.d.ts'}],
})
