import { recordTelemetryAttributes } from '@redmix/cli-helpers'

import { deployBuilder } from './helpers/deployBuilder.js'

export const command = 'netlify [...commands]'
export const description = 'Build command for Netlify deploy'

export const builder = (yargs) => deployBuilder(yargs)

export async function handler(yargs) {
  recordTelemetryAttributes({
    command: 'deploy netlify',
    build: yargs.build,
    prisma: yargs.prisma,
    dataMigrate: yargs.dataMigrate,
  })

  const { handler: importedHandler } = await import(
    './helpers/deployHandler.js'
  )

  return importedHandler(yargs)
}
