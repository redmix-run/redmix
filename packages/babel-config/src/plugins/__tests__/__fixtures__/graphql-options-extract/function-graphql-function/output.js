import { createGraphQLHandler } from '@cedarjs/graphql-server'
import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
const config = () => ({
  loggerConfig: {
    logger,
    options: {},
  },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
export const __rw_graphqlOptions = config()
export const handler = createGraphQLHandler(__rw_graphqlOptions)
