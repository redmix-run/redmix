import { files as cellFiles } from '../../generate/cell/cellHandler.js'
import { createYargsForComponentDestroy, createHandler } from '../helpers.js'

export const { command, description, builder } = createYargsForComponentDestroy(
  { componentName: 'cell', filesFn: cellFiles },
)
export const handler = createHandler('cell')
