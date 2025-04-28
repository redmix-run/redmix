import fs from 'node:fs'

import {
  buildExternalCjs,
  build,
  defaultBuildOptions,
  defaultIgnorePatterns,
} from '@redmix/framework-tools'

// Some comments I wish I had a better place for...
//  - The `exports` field in package.json must have the "types" condition first
//    See the end of this section:
//      https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#package.json-exports-imports-and-self-referencing
//  - We specify `tsBuildInfoFile` for `tsconfig.cjs.json` because otherwise
//    it'd be placed inside ./dist/ (because outDir is dist/cjs and the default
//    is to place it at one level up from outDir).

await buildExternalCjs()
await build({
  entryPointOptions: {
    // NOTE: building the bins as CJS only so they can still use
    // require.resolve()
    ignore: [...defaultIgnorePatterns, 'src/bins/**'],
  },
  buildOptions: {
    ...defaultBuildOptions,
    tsconfig: 'tsconfig.build.json',
    format: 'esm',
    packages: 'external',
  },
})

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

// Place a package.json file with `type: commonjs` in the dist/cjs folder so
// that all .js files are treated as CommonJS files.
fs.writeFileSync('dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }))

// Place a package.json file with `type: module` in the dist folder so that
// all .js files are treated as ES Module files.
// Also adding version and dependencies so that src/index.ts for the CJS build
// can read those (The relative ../package.json path in the index.ts file will
// point to this file)
fs.writeFileSync(
  'dist/package.json',
  JSON.stringify({
    type: 'module',
    version: packageJson.version,
    dependencies: packageJson.dependencies,
  }),
)
