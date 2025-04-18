#!/usr/bin/env node

import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const pkgJsonPath = require.resolve('@redmix/api-server/package.json')
const apiServerPackageJsonFileUrl = pathToFileURL(pkgJsonPath)
const requireFromApiServer = createRequire(apiServerPackageJsonFileUrl)
const bins = requireFromApiServer('./package.json')['bin']
const apiServerEntryPointUrl = new URL(
  bins['rw-api-server-watch'],
  apiServerPackageJsonFileUrl,
)

import(apiServerEntryPointUrl.toString())
