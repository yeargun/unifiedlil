import {VFile} from 'vfile'

Object.defineProperty(VFile, Symbol.hasInstance, {
  configurable: true,
  value(instance) {
    return Boolean(
      instance &&
        typeof instance === 'object' &&
        'message' in instance &&
        'messages' in instance
    )
  }
})

/* eslint-disable import/no-unassigned-import */
import './core.js'
import './data.js'
import './freeze.js'
import './parse.js'
import './process.js'
import './process-compilers.js'
import './process-sync.js'
import './run.js'
import './run-sync.js'
import './stringify.js'
import './use.js'
/* eslint-enable import/no-unassigned-import */
