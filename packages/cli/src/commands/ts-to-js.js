import { recordTelemetryAttributes } from '@redmix/cli-helpers'
import {
  convertTsProjectToJs,
  convertTsScriptsToJs,
} from '@redmix/internal/dist/ts2js'
import { getPaths } from '@redmix/project-config'

export const command = 'ts-to-js'
export const description =
  '[DEPRECATED]\n' + 'Convert a TypeScript project to JavaScript'

export const handler = () => {
  recordTelemetryAttributes({
    command: 'ts-to-js',
  })
  convertTsProjectToJs(getPaths().base)
  convertTsScriptsToJs(getPaths().base)
}
