import { files as cellFiles } from '../../generate/cell/cell.js'
import { createHandler } from '../handlerHelpers.js'

export const { command, description, builder, handler, tasks } = createHandler({
  componentName: 'cell',
  filesFn: cellFiles,
})
