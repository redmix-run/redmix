import type { PluginOption } from 'vite'

export function mockRouter(): PluginOption {
  return {
    name: 'mock-@redmix/router',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (id.includes('src')) {
        code = code.replace(
          "'@redmix/router'",
          "'storybook-framework-redmix-vite/dist/mocks/MockRouter'",
        )
      }
      return code
    },
  }
}
