import { writeFileSync } from 'node:fs'

import { buildExternalCjs, buildExternalEsm } from '@redmix/framework-tools'

await buildExternalCjs()
await buildExternalEsm()

// Place a package.json file with `type: commonjs` in the dist/cjs folder so
// that all .js files are treated as CommonJS files.
writeFileSync('dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }))

// Place a package.json file with `type: module` in the dist folder so that
// all .js files are treated as ES Module files.
writeFileSync('dist/package.json', JSON.stringify({ type: 'module' }))
