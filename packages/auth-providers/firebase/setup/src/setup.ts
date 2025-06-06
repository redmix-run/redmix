import type yargs from 'yargs'

import { standardAuthBuilder } from '@cedarjs/cli-helpers'

export const command = 'firebase'
export const description = 'Set up auth for for Firebase'

export function builder(yargs: yargs.Argv) {
  return standardAuthBuilder(yargs)
}

export interface Args {
  force: boolean
}

export async function handler(options: Args) {
  const { handler } = await import('./setupHandler.js')
  return handler(options)
}
