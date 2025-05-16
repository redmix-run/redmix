import { getInstalledCedarVersion } from '../lib/index.js'

export default async function detectRxVersion(argv) {
  if (!argv.rwVersion) {
    return {
      rwVersion: await getInstalledCedarVersion(),
    }
  }

  return {}
}
