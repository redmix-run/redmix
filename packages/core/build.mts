import { build, defaultBuildOptions } from '@redmix/framework-tools'

// ESM build
await build({
  buildOptions: {
    ...defaultBuildOptions,
    format: 'esm',
    outdir: 'dist/bins',
  },
})
