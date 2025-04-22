import terminalLink from 'terminal-link'

export const command = 'flightcontrol <side>'
export const alias = 'fc'
export const description =
  'Build, Migrate, and Serve commands for Flightcontrol deploy'

export const builder = (yargs) => {
  yargs
    .positional('side', {
      choices: ['api', 'web'],
      description: 'Side to deploy',
      type: 'string',
    })
    .option('prisma', {
      description: 'Apply database migrations',
      type: 'boolean',
      default: true,
    })
    .option('serve', {
      description: 'Run server for api in production',
      type: 'boolean',
      default: false,
    })
    .option('data-migrate', {
      description: 'Apply data migrations',
      type: 'boolean',
      default: true,
      alias: 'dm',
    })
    .epilogue(
      `For more commands, options, and examples, see ${terminalLink(
        'Redwood CLI Reference',
        'https://redwoodjs.com/docs/cli-commands#deploy',
      )}`,
    )
}

export async function handler(yargs) {
  const { handler: importedHandler } = await import('./flightcontrolHandler')

  return importedHandler(yargs)
}
