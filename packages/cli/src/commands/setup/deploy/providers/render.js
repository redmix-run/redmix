import { createHandler } from '../helpers/helpers.js'

export const command = 'render'
export const description = 'Setup Render deploy'

export const builder = (yargs) =>
  yargs.option('database', {
    alias: 'd',
    choices: ['none', 'postgresql', 'sqlite'],
    description: 'Database deployment for Render only',
    default: 'postgresql',
    type: 'string',
  })

export const handler = createHandler('render')
