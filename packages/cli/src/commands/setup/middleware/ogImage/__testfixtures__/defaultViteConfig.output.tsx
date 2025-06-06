import vitePluginOgImageGen from '@cedarjs/ogimage-gen/plugin'
import dns from 'dns'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'

import redwood from '@cedarjs/vite'

// So that Vite will load on localhost instead of `127.0.0.1`.
// See: https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder('verbatim')

const viteConfig: UserConfig = {
  plugins: [redwood(), vitePluginOgImageGen()],
  optimizeDeps: {
    force: true,
  },
}

export default defineConfig(viteConfig)
