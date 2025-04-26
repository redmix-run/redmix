#!/usr/bin/env node
import { createRequire } from 'node:module'

const customRequire =
  typeof require === 'function' ? require : createRequire(import.meta.url)

const requireFromTypeScript = createRequire(
  customRequire.resolve('typescript/package.json'),
)

const bins = requireFromTypeScript('./package.json')['bin']

requireFromTypeScript(bins['tsc'])
