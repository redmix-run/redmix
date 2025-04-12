import type {
  Middleware,
  MiddlewareClass,
} from '@redmix/web/dist/server/middleware'

// Tuple of [mw, '*.{extension}']
export type MiddlewareReg = (
  | [Middleware | MiddlewareClass, string]
  | Middleware
  | MiddlewareClass
)[]
