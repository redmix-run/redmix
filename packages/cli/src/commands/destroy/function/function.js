import { files as functionFiles } from '../../generate/function/functionHandler.js'
import { createYargsForComponentDestroy, createHandler } from '../helpers.js'

export const description = 'Destroy a Function'

export const builder = (yargs) => {
  yargs.positional('name', {
    description: 'Name of the Function',
    type: 'string',
  })
}

export const { command } = createYargsForComponentDestroy({
  componentName: 'function',
  filesFn: functionFiles,
})

export const handler = createHandler('function')
