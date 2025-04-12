import { recordTelemetryAttributes } from '@redmix/cli-helpers'
import { parseDatamodel } from '@redmix/record'

export const handler = async () => {
  recordTelemetryAttributes({
    command: 'record',
  })
  await parseDatamodel()
}
