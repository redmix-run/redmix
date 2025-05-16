import type { RedwoodFastifyWebOptions } from '@cedarjs/fastify-web'

export type ParsedOptions = {
  port?: number
  host?: string
} & RedwoodFastifyWebOptions['redwood']
