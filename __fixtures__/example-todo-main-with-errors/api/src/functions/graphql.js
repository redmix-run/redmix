import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@cedarjs/api'
import importAll from '@cedarjs/api/importAll.macro'

import { db } from 'src/lib/db'

const schemas = importAll('api', 'graphql')
const services = importAll('api', 'services')

export const handler = createGraphQLHandler(
  {
    schema: makeMergedSchema({
      schemas,
      services: makeServices({ services }),
    }),
  },
  db
)
