import { parseArgs } from 'util'

import type {
  FastifyListenOptions,
  FastifyServerOptions,
  FastifyInstance,
} from 'fastify'

import { coerceRootPath } from '@cedarjs/fastify-web/dist/helpers'

import { getAPIHost, getAPIPort } from './cliHelpers'

export type StartOptions = Omit<FastifyListenOptions, 'port' | 'host'>

export interface Server extends FastifyInstance {
  start: (options?: StartOptions) => Promise<string>
}

export interface CreateServerOptions {
  /** The prefix for all routes. Defaults to `/` */
  apiRootPath?: string

  /** Logger instance or options */
  logger?: FastifyServerOptions['logger']

  /**
   * Options for the fastify server instance.
   * Omitting logger here because we move it up.
   */
  fastifyServerOptions?: Omit<FastifyServerOptions, 'logger'>

  /** Customise the API server fastify plugin before it is registered */
  configureApiServer?: (server: Server) => void | Promise<void>

  /** Whether to parse args or not. Defaults to `true` */
  parseArgs?: boolean

  /** The port to listen on. Defaults to what's configured in redwood.toml */
  apiPort?: number

  /** The host to bind to. Defaults to what's configured in redwood.toml */
  apiHost?: string
}

type DefaultCreateServerOptions = Required<
  Omit<CreateServerOptions, 'fastifyServerOptions'> & {
    fastifyServerOptions: FastifyServerOptions
  }
>

// This is a function instead of just a constant so that we don't execute
// getAPIHost and getAPIPort just by importing this file.
export const getDefaultCreateServerOptions: () => DefaultCreateServerOptions =
  () => ({
    apiRootPath: '/',
    logger: {
      level:
        process.env.LOG_LEVEL ??
        (process.env.NODE_ENV === 'development' ? 'debug' : 'warn'),
    },
    fastifyServerOptions: {
      requestTimeout: 15_000,
      bodyLimit: 1024 * 1024 * 100, // 100MB
    },
    configureApiServer: () => {},
    parseArgs: true,
    apiHost: getAPIHost(),
    apiPort: getAPIPort(),
  })

type ResolvedOptions = Required<
  Omit<CreateServerOptions, 'logger' | 'fastifyServerOptions' | 'parseArgs'> & {
    fastifyServerOptions: FastifyServerOptions
  }
>

export function resolveOptions(
  options: CreateServerOptions = {},
  args?: string[],
) {
  options.parseArgs ??= true

  const defaults = getDefaultCreateServerOptions()

  options.logger ??= defaults.logger

  // Set defaults.
  const resolvedOptions: ResolvedOptions = {
    apiRootPath: options.apiRootPath ?? defaults.apiRootPath,

    fastifyServerOptions: options.fastifyServerOptions ?? {
      requestTimeout: defaults.fastifyServerOptions.requestTimeout,
      logger: options.logger ?? defaults.logger,
      bodyLimit: defaults.fastifyServerOptions.bodyLimit,
    },
    configureApiServer:
      options.configureApiServer ?? defaults.configureApiServer,
    apiHost: options.apiHost ?? defaults.apiHost,
    apiPort: options.apiPort ?? defaults.apiPort,
  }

  // Merge fastifyServerOptions.
  resolvedOptions.fastifyServerOptions.requestTimeout ??=
    defaults.fastifyServerOptions.requestTimeout
  resolvedOptions.fastifyServerOptions.logger = options.logger

  if (options.parseArgs) {
    const { values } = parseArgs({
      options: {
        apiHost: {
          type: 'string',
        },
        apiPort: {
          type: 'string',
          short: 'p',
        },
        apiRootPath: {
          type: 'string',
        },
      },
      strict: false,
      ...(args && { args }),
    })

    if (values.apiHost && typeof values.apiHost !== 'string') {
      throw new Error('`apiHost` must be a string')
    }
    if (values.apiHost) {
      resolvedOptions.apiHost = values.apiHost
    }

    if (values.apiPort) {
      resolvedOptions.apiPort = +values.apiPort

      if (isNaN(resolvedOptions.apiPort)) {
        throw new Error('`apiPort` must be an integer')
      }
    }

    if (values.apiRootPath && typeof values.apiRootPath !== 'string') {
      throw new Error('`apiRootPath` must be a string')
    }
    if (values.apiRootPath) {
      resolvedOptions.apiRootPath = values.apiRootPath
    }
  }

  resolvedOptions.apiRootPath = coerceRootPath(resolvedOptions.apiRootPath)

  return resolvedOptions
}
