import terminalLink from 'terminal-link'

import detectRwVersion from '../middleware/detectProjectRwVersion.js'

import * as experimentalInngest from './experimental/setupInngest.js'
import * as experimentalOpenTelemetry from './experimental/setupOpentelemetry.js'
import * as experimentalReactCompiler from './experimental/setupReactCompiler.js'
import * as experimentalRsc from './experimental/setupRsc.js'
import * as experimentalStreamingSsr from './experimental/setupStreamingSsr.js'

export const command = 'experimental <command>'
export const aliases = ['exp']
export const description = 'Run or setup experimental features'

export const builder = (yargs) =>
  yargs
    .command(experimentalInngest)
    .command(experimentalOpenTelemetry)
    .command(experimentalReactCompiler)
    .command(experimentalRsc)
    .command(experimentalStreamingSsr)
    .demandCommand()
    .middleware(detectRwVersion)
    .epilogue(
      `Also see the ${terminalLink(
        'Redwood CLI Reference',
        'https://redwoodjs.com/docs/cli-commands#experimental',
      )}`,
    )
