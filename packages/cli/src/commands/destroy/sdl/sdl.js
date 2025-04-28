import { createHandler } from '../helpers'

export const command = 'sdl <model>'
export const description =
  'Destroy a GraphQL schema and service component based on a given DB schema Model'
export const builder = (yargs) => {
  yargs.positional('model', {
    description: 'Model to destroy the sdl of',
    type: 'string',
  })
}
export const handler = createHandler('sdl')
