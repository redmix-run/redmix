import fs from 'fs'
import path from 'path'

import { fetch } from '@whatwg-node/fetch'

import { getPaths } from '@redmix/project-config'

/**
 * Fetches the FatalErrorPage from the create-redmix-app template and replaces
 * the current one in the project
 */
export const updateDevFatalErrorPage = async () => {
  const rwPaths = getPaths()

  const webFatalErrorPagesDir = path.join(rwPaths.web.pages, 'FatalErrorPage')
  const filename = path.join(webFatalErrorPagesDir, 'FatalErrorPage')
  const url =
    'https://raw.githubusercontent.com/redmix-run/redmix/0acd00946f9ad235320ea9b0b9a380d366e8936f/packages/create-redmix-app/templates/ts/web/src/pages/FatalErrorPage/FatalErrorPage.tsx'

  const isTsxPage = fs.existsSync(
    path.join(webFatalErrorPagesDir, 'FatalErrorPage.tsx'),
  )
  const isJsxPage = fs.existsSync(
    path.join(webFatalErrorPagesDir, 'FatalErrorPage.jsx'),
  )
  const ext = isTsxPage ? 'tsx' : isJsxPage ? 'jsx' : 'js'

  const res = await fetch(url)
  const text = await res.text()
  const newFatalErrorPage = `${filename}.${ext}`

  fs.writeFileSync(newFatalErrorPage, text)
}
