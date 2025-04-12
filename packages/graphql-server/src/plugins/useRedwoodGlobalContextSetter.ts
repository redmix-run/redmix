import type { Plugin } from 'graphql-yoga'

import { setContext } from '@redmix/context'

import type { RedwoodGraphQLContext } from '../types'

/**
 * This Envelop plugin waits until the GraphQL context is done building and sets the
 * Redwood global context which can be imported with:
 * // import { context } from '@redmix/graphql-server'
 * @returns
 */
export const useRedwoodGlobalContextSetter =
  (): Plugin<RedwoodGraphQLContext> => ({
    onContextBuilding() {
      return ({ context: redwoodGraphqlContext }) => {
        setContext(redwoodGraphqlContext)
      }
    },
  })
