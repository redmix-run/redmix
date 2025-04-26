#!/usr/bin/env node

import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const customRequire =
  typeof require === 'function' ? require : createRequire(import.meta.url)

const cliPackageJsonFileUrl = pathToFileURL(
  customRequire.resolve('@redmix/cli/package.json'),
)

const requireFromCli = createRequire(cliPackageJsonFileUrl)
const bins = requireFromCli('./package.json')['bin']
const cliEntryPointUrl = new URL(bins['rwfw'], cliPackageJsonFileUrl)

// If this is defined, we're running through yarn and need to change the cwd.
// See https://yarnpkg.com/advanced/lifecycle-scripts/#environment-variables.
if (process.env.PROJECT_CWD) {
  process.chdir(process.env.PROJECT_CWD)
}

import(cliEntryPointUrl.toString())
