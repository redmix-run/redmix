import { getInstalledRedmixVersion } from '../lib/index.js'

export default async function detectRxVersion(argv) {
  if (!argv.rwVersion) {
    return {
      rwVersion: await getInstalledRedmixVersion(),
    }
  }

  return {}
}
