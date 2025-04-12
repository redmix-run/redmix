#!/usr/bin/env node
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const requireFromApiServer = createRequire(
  require.resolve('@redmix/api-server/package.json'),
)

const bins = requireFromApiServer('./package.json')['bin']

requireFromApiServer(bins['rw-api-server-watch'])
