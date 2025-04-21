import {
  createCommand,
  createBuilder,
  yargsDefaults,
} from '../yargsCommandHelpers.js'
import { createYargsForComponentGeneration } from '../yargsHandlerHelpers.js'

export const command = createCommand('directive')
export const description = 'Generate a new GraphQL directive'
export const builder = createBuilder({ componentName: 'directive' })

createYargsForComponentGeneration({
  componentName: 'directive',
  optionsObj: {
    ...yargsDefaults,
    type: {
      type: 'string',
      choices: ['validator', 'transformer'],
      description: 'Whether to generate a validator or transformer directive',
    },
  },
})

export async function handler(argv) {
  const { handler: directiveHandler } = await import('./directiveHandler.js')

  return directiveHandler(argv)
}
