#!/usr/bin/env node
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const requireFromInternal = createRequire(
  require.resolve('@redmix/internal/package.json'),
)

const bins = requireFromInternal('./package.json')['bin']

const { run } = requireFromInternal(bins['rw-gen'])

run()
