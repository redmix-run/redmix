/* eslint-env node */

import { fileURLToPath } from 'node:url'

import Configstore from 'configstore'
import { cd, fs, os, path, $ } from 'zx'

const config = new Configstore('create-cedar-app')
let projectPath = config.get('projectPath')

const projectExists = projectPath && (await fs.pathExists(projectPath))

if (!projectExists) {
  const [timestamp] = new Date().toISOString().replace(/-|:/g, '_').split('.')

  projectPath = path.join(os.tmpdir(), `crwa_${timestamp}`)

  await fs.ensureDir(projectPath)
  await $`yarn --cwd ${projectPath} init -2`

  config.set('projectPath', projectPath)
}

const packagePath = fileURLToPath(new URL('../', import.meta.url))
const tarball = 'create-cedar-app.tgz'

await fs.move(
  path.join(packagePath, tarball),
  path.join(projectPath, tarball),
  { overwrite: true },
)

cd(projectPath)
await $`yarn add ./${tarball}`

console.log(projectPath)
