import { build, defaultBuildOptions } from '@redmix/framework-tools'
import { insertCommonJsPackageJson } from '@redmix/framework-tools/generateTypes'

// ESM build
await build({
  buildOptions: {
    ...defaultBuildOptions,
    format: 'esm',
  },
})

// CJS build
await build({
  buildOptions: {
    ...defaultBuildOptions,
    outdir: 'dist/cjs',
  },
})
await insertCommonJsPackageJson({
  buildFileUrl: import.meta.url,
})
