import {
  createCommand,
  createDescription,
  createBuilder,
  yargsDefaults,
} from '../yargsCommandHelpers.js'

const optionsObj = {
  skipLink: {
    default: false,
    description: 'Generate with skip link',
    type: 'boolean',
  },
  ...yargsDefaults,
}

export const command = createCommand('layout')
export const description = createDescription('layout')
export const builder = createBuilder({ componentName: 'layout', optionsObj })

export async function handler(argv) {
  const { handler: importedHandler } = await import('./layoutHandler.js')

  return importedHandler(argv)
}
