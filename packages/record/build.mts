import { build, defaultBuildOptions } from '@cedarjs/framework-tools'
import { insertCommonJsPackageJson } from '@cedarjs/framework-tools/generateTypes'

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
