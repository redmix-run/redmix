import { createCommand, createBuilder } from '../yargsCommandHelpers.js'

export const command = createCommand('component')
export const description = 'Generate a component'
export const builder = createBuilder({ componentName: 'component' })

export async function handler(argv) {
  const { handler: componentHandler } = await import('./componentHandler.js')

  return componentHandler(argv)
}
