import { Listr } from 'listr2'

import { recordTelemetryAttributes } from '@redmix/cli-helpers'

import { deleteFilesTask } from '../../lib/index.js'

const tasks = ({ componentName, filesFn, name }) =>
  new Listr(
    [
      {
        title: `Destroying ${componentName} files...`,
        task: async () => {
          const f = await filesFn({ name, stories: true, tests: true })
          return deleteFilesTask(f)
        },
      },
    ],
    { rendererOptions: { collapseSubtasks: false }, exitOnError: true },
  )

export function createHandler({
  componentName,
  preTasksFn = (options) => options,
  filesFn,
}) {
  return {
    handler: async (options) => {
      recordTelemetryAttributes({
        command: `destroy ${componentName}`,
      })
      options = await preTasksFn({ ...options, isDestroyer: true })
      await tasks({ componentName, filesFn, name: options.name }).run()
    },
    tasks,
  }
}
