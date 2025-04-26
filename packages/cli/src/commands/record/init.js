import { recordTelemetryAttributes } from '@redmix/cli-helpers'

export const handler = async () => {
  recordTelemetryAttributes({
    command: 'record',
  })

  const { parseDatamodel } = await import('@redmix/record')

  parseDatamodel()
}
