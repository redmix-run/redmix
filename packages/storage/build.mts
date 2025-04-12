import { build, defaultBuildOptions } from '@redmix/framework-tools'
import {
  generateTypesCjs,
  generateTypesEsm,
  insertCommonJsPackageJson,
} from '@redmix/framework-tools/generateTypes'

// ESM build
await build({
  buildOptions: {
    ...defaultBuildOptions,
    format: 'esm',
    packages: 'external',
  },
})

await generateTypesEsm()

// CJS build
await build({
  buildOptions: {
    ...defaultBuildOptions,
    outdir: 'dist/cjs',
    packages: 'external',
  },
})

await generateTypesCjs()

await insertCommonJsPackageJson({
  buildFileUrl: import.meta.url,
  cjsDir: 'dist/cjs',
})
