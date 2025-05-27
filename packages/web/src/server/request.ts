// This just proxies the `@cedarjs/server-store` package.
// Our builds are specifically configured _not_ to bundle server-store

// This is mainly so that the import looks clean to the user e.g.
// import { getRequestCookies } from '@cedarjs/web/request'
// server store doesn't make sense outside the framework

export {
  getRequestCookies,
  getRequestHeaders,
  getLocation,
  getAuthState,
} from '@cedarjs/server-store'
