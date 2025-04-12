import { build, defaultBuildOptions } from '@redmix/framework-tools'

await build({
  buildOptions: {
    ...defaultBuildOptions,
    format: 'esm',
    packages: 'external',
  },
})
