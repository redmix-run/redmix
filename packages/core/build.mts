import { build, defaultBuildOptions } from '@cedarjs/framework-tools'

// ESM build
await build({
  buildOptions: {
    ...defaultBuildOptions,
    format: 'esm',
    outdir: 'dist/bins',
  },
})
