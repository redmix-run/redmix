import fg from 'fast-glob'

import { getPaths } from '@cedarjs/project-config'

const isTSProject =
  fg.sync(`${getPaths().base}/**/tsconfig.json`, {
    ignore: ['**/node_modules/**'],
  }).length > 0

export default isTSProject
