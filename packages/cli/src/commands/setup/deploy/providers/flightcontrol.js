import { createHandler } from '../helpers/helpers.js'

export const command = 'flightcontrol'
export const alias = 'fc'
export const description = 'Setup Flightcontrol deploy'

export const builder = (yargs) =>
  yargs.option('database', {
    alias: 'd',
    choices: ['none', 'postgresql', 'mysql'],
    description: 'Database deployment for Flightcontrol only',
    default: 'postgresql',
    type: 'string',
  })

export const handler = createHandler('flightcontrol')
