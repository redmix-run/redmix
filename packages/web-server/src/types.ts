import type { RedwoodFastifyWebOptions } from '@redmix/fastify-web'

export type ParsedOptions = {
  port?: number
  host?: string
} & RedwoodFastifyWebOptions['redwood']
