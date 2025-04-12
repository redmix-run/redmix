import { build, defaultBuildOptions } from '@redmix/framework-tools'

await build({
  buildOptions: {
    ...defaultBuildOptions,
    bundle: true,
    entryPoints: ['src/index.ts'],
    packages: 'external',
  },
})
