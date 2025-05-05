import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // TODO: Remove this when we've made babel-config ESM+CJS dual build
    // https://stackoverflow.com/a/77439684/88106
    alias: {
      '@redmix/babel-config': path.resolve(
        import.meta.dirname,
        '../../babel-config/src',
      ),
    },
  },
})
