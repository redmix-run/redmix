import { files as componentFiles } from '../../generate/component/componentHandler.js'
import { createHandler, createYargsForComponentDestroy } from '../helpers.js'

export const description = 'Destroy a component'

export const { command, builder, tasks } = createYargsForComponentDestroy({
  componentName: 'component',
  filesFn: componentFiles,
})
export const handler = createHandler('component')
