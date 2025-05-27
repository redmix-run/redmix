import type {
  RoutingOptions,
  SignUpForceRedirectUrl,
  SignUpFallbackRedirectUrl,
  LegacyRedirectProps,
  AfterSignOutUrl,
  SignUpProps,
  SignOutCallback,
  Clerk,
  GetTokenOptions,
  SignOutOptions,
  SignInTheme,
  SignInInitialValues,
} from '@clerk/types'

// This inteface isn't exported from `@clerk/types` and because of that we get
// this error:
// error TS4058: Return type of exported function has or is using name
// 'TransferableOption' from external module
// "/Users/tobbe/dev/cedarjs/cedar/node_modules/@clerk/types/dist/index"but
// cannot be named.
// So the entire reason for this file (ClerkTypes.ts) to exist is to work around
// that error
export interface TransferableOption {
  /**
   * Indicates whether or not sign in attempts are transferable to the sign up flow.
   * When set to false, prevents opaque sign ups when a user attempts to sign in via OAuth with an email that doesn't exist.
   * @default true
   */
  transferable?: boolean
}

type SignInProps = RoutingOptions & {
  /**
   * Full URL or path to navigate after successful sign in.
   * This value has precedence over other redirect props, environment variables or search params.
   * Use this prop to override the redirect URL when needed.
   * @default undefined
   */
  forceRedirectUrl?: string | null
  /**
   * Full URL or path to navigate after successful sign in.
   * This value is used when no other redirect props, environment variables or search params are present.
   * @default undefined
   */
  fallbackRedirectUrl?: string | null
  /**
   * Full URL or path to for the sign up process.
   * Used to fill the "Sign up" link in the SignUp component.
   */
  signUpUrl?: string
  /**
   * Customisation options to fully match the Clerk components to your own brand.
   * These options serve as overrides and will be merged with the global `appearance`
   * prop of ClerkProvider (if one is provided)
   */
  appearance?: SignInTheme
  /**
   * Initial values that are used to prefill the sign in form.
   */
  initialValues?: SignInInitialValues
} & TransferableOption &
  SignUpForceRedirectUrl &
  SignUpFallbackRedirectUrl &
  LegacyRedirectProps &
  AfterSignOutUrl

export type {
  SignInProps,
  SignUpProps,
  SignOutCallback,
  Clerk,
  GetTokenOptions,
  SignOutOptions,
}
