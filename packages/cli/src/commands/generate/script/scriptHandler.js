import path from 'path'

import fs from 'fs-extra'
import { Listr } from 'listr2'

import { recordTelemetryAttributes } from '@cedarjs/cli-helpers'
import { errorTelemetry } from '@cedarjs/telemetry'

import c from '../../../lib/colors.js'
import {
  getPaths,
  writeFilesTask,
  transformTSToJS,
} from '../../../lib/index.js'
import { prepareForRollback } from '../../../lib/rollback.js'
import { validateName } from '../helpers.js'

const TEMPLATE_PATH = path.resolve(
  import.meta.dirname,
  'templates',
  'script.ts.template',
)
const TSCONFIG_TEMPLATE = path.resolve(
  import.meta.dirname,
  'templates',
  'tsconfig.json.template',
)

export const files = async ({ name, typescript = false }) => {
  const outputFilename = `${name}.${typescript ? 'ts' : 'js'}`
  const outputPath = path.join(getPaths().scripts, outputFilename)

  const scriptTsConfigPath = path.join(getPaths().scripts, 'tsconfig.json')

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8')

  return {
    [outputPath]: typescript
      ? template
      : await transformTSToJS(outputPath, template),

    // Add tsconfig for type and cmd+click support if project is TS
    ...(typescript &&
      !fs.existsSync(scriptTsConfigPath) && {
        [scriptTsConfigPath]: fs.readFileSync(TSCONFIG_TEMPLATE, 'utf-8'),
      }),
  }
}

export const handler = async ({ force, ...args }) => {
  recordTelemetryAttributes({
    command: 'generate script',
    force,
    rollback: args.rollback,
  })

  const POST_RUN_INSTRUCTIONS = `Next steps...\n\n   ${c.warning(
    'After modifying your script, you can invoke it like:',
  )}

     yarn rw exec ${args.name}

     yarn rw exec ${args.name} --param1 true
`

  validateName(args.name)

  const tasks = new Listr(
    [
      {
        title: 'Generating script file...',
        task: async () => {
          return writeFilesTask(await files(args), { overwriteExisting: force })
        },
      },
      {
        title: 'Next steps...',
        task: (_ctx, task) => {
          task.title = POST_RUN_INSTRUCTIONS
        },
      },
    ].filter(Boolean),
    { rendererOptions: { collapseSubtasks: false } },
  )

  try {
    if (args.rollback && !force) {
      prepareForRollback(tasks)
    }
    await tasks.run()
  } catch (e) {
    errorTelemetry(process.argv, e.message)
    console.log(c.error(e.message))
    process.exit(1)
  }
}
