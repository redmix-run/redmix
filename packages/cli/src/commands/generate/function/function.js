import terminalLink from 'terminal-link'

import { yargsDefaults } from '../yargsCommandHelpers.js'

export const command = 'function <name>'
export const description = 'Generate a Function'

// This could be built using createYargsForComponentGeneration;
// however, functions shouldn't have a `stories` option. createYargs...
// should be reversed to provide `yargsDefaults` as the default configuration
// and accept a configuration such as its CURRENT default to append onto a command.
export const builder = (yargs) => {
  yargs
    .positional('name', {
      description: 'Name of the Function',
      type: 'string',
    })
    .option('rollback', {
      description: 'Revert all generator actions if an error occurs',
      type: 'boolean',
      default: true,
    })
    .epilogue(
      `Also see the ${terminalLink(
        'Redwood CLI Reference',
        'https://redwoodjs.com/docs/cli-commands#generate-function',
      )}`,
    )

  // Add default options, includes '--typescript', '--javascript', '--force', ...
  Object.entries(yargsDefaults).forEach(([option, config]) => {
    yargs.option(option, config)
  })
}

export async function handler(argv) {
  const { handler: importedHandler } = await import('./functionHandler.js')

  return importedHandler(argv)
}
