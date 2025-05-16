import { build, defaultBuildOptions } from '@cedarjs/framework-tools'
import {
  generateTypesCjs,
  generateTypesEsm,
  insertCommonJsPackageJson,
} from '@cedarjs/framework-tools/generateTypes'

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
