import { build, defaultBuildOptions } from '@cedarjs/framework-tools'

await build({
  buildOptions: {
    ...defaultBuildOptions,
    bundle: true,
    entryPoints: ['src/index.ts'],
    packages: 'external',
  },
})
