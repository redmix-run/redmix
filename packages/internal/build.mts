import { build, copyAssets } from '@cedarjs/framework-tools'

await build()
await copyAssets({
  buildFileUrl: import.meta.url,
  patterns: ['generate/templates/**/*.template'],
})
