import {
  createCommand,
  createDescription,
  createBuilder,
  createHandler,
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
export const handler = createHandler('layout')
