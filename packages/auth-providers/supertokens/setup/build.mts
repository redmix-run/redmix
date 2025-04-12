import { build, copyAssets } from '@redmix/framework-tools'

await build()

await copyAssets({
  buildFileUrl: import.meta.url,
  patterns: ['templates/**/*.template'],
})
