import path from 'path'

import fg from 'fast-glob'
import type { TaskInnerAPI } from 'tasuku'
import task from 'tasuku'

import { getPaths } from '@cedarjs/project-config'

import runTransform from '../../../lib/runTransform'

export const command = 'process-env-dot-notation'
export const description = '(v6.x.x->v6.x.x) Converts world to bazinga'

export const handler = () => {
  task('Process Env Dot Notation', async ({ setOutput }: TaskInnerAPI) => {
    await runTransform({
      transformPath: path.join(__dirname, 'processEnvDotNotation.js'),
      targetPaths: fg.sync('**/*.{js,jsx,tsx}', {
        cwd: getPaths().web.src,
        absolute: true,
      }),
    })

    setOutput('All done! Run `yarn rw lint --fix` to prettify your code')
  })
}
