import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {buildPackage} from './compiler-package.mjs'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
await buildPackage({root,
  profiles: [{name:'public', config:'lilscript.toml'}, {name:'closed', config:'lilscript.closed.toml'}],
  aliases: {"unified.raw.js": "unified.esm.js", "unified.closed.raw.js": "unified.closed.js", "vfile.raw.js": "vfile.esm.js"},
  assets: [{source:'types/unified.d.ts', destination:'unified.d.ts'}],
})
