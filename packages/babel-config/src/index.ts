// The excess of exports here is for backwards compatibility
// since `@redwoodjs/internal` exported everything from babel/api, web, and common.
// See https://github.com/redwoodjs/redwood/blob/44b4a9023ac3a14b5f56b071052bdf49c410bb8b/packages/internal/src/index.ts#L13-L16.

export {
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  BABEL_PLUGIN_TRANSFORM_RUNTIME_OPTIONS,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  TARGETS_NODE,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  getApiSideBabelConfigPath,
  /** Used by @redmix/internal and @redmix/testing */
  getApiSideBabelPlugins,
  /** Used by @redmix/testing */
  getApiSideBabelPresets,
  /** Used by @redmix/testing and @redmix/eslint-config */
  getApiSideDefaultBabelConfig,
  /** Used by @redmix/cli, @remix/cli-helpers and @redmix/prerender */
  registerApiSideBabelHook,
  /** Used by @redmix/internal and @redmix/vite */
  transformWithBabel,
} from './api'

export {
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  getWebSideBabelConfigPath,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  getWebSideBabelPlugins,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  getWebSideBabelPresets,
  /** Used by @redmix/cli, @remix/eslint-config and @redmix/vite */
  getWebSideDefaultBabelConfig,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  getWebSideOverrides,
  /** Used by @redmix/prerender */
  registerWebSideBabelHook,
} from './web'

export type { Flags } from './web'

export {
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  CORE_JS_VERSION,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  RUNTIME_CORE_JS_VERSION,
  /** Used by our eslint-config  */
  getCommonPlugins,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  getPathsFromTypeScriptConfig as getPathsFromConfig,
  /** Used by vite */
  getRouteHookBabelPlugins,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  parseTypeScriptConfigFiles,
  /**
   * @deprecated This export isn't used by the framework, so it'll be removed
   * in a future version.
   */
  registerBabel,
} from './common'
