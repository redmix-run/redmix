import path from 'node:path'
import { fileURLToPath } from 'node:url'

import fs from 'fs-extra'

import { runCommandTask, getPaths } from '../lib/index.js'

const skipTask = (schema = getPaths().api.dbSchema) => {
  if (!fs.existsSync(schema)) {
    console.log(
      `Skipping database and Prisma client generation, no \`schema.prisma\` file found: \`${schema}\``,
    )
    return true
  }
  return false
}

export const generatePrismaCommand = (schema) => {
  if (skipTask(schema)) {
    return {}
  }

  const prismaIndexPath = fileURLToPath(
    import.meta.resolve('prisma/build/index.js'),
  )

  return {
    cmd: `node "${prismaIndexPath}"`,
    args: ['generate', schema && `--schema="${schema}"`],
  }
}

/**
 * Conditionally generate the prisma client, skip if it already exists.
 */
export const generatePrismaClient = async ({
  verbose = true,
  force = true,
  silent = false,
  schema = getPaths().api.dbSchema,
}) => {
  if (skipTask(schema)) {
    return
  }

  // Do not generate the Prisma client if it exists.
  if (!force) {
    const prismaClientPath = path.join(
      getPaths().base,
      'node_modules/.prisma/client/index.js',
    )

    const prismaClientFile = fs.readFileSync(prismaClientPath, 'utf8')

    // This is a hack, and is likely to break. A better solution would be to
    // try to import the Prisma client. But that gets cached, so we'd have to
    // do it in a worker thread.
    // See https://github.com/nodejs/node/issues/49442#issuecomment-1703472299
    // for an idea on how to do that
    // Just reading the file and manually looking for known strings is faster
    // and works around the caching issue. But is less future proof. But it's
    // good enough for now.
    // If we want to go back to `await import(...)` we could try appending
    // `?cache_busting=${Date.now()}` to the URL.
    if (
      !prismaClientFile.includes('@prisma/client did not initialize yet.') &&
      prismaClientFile.includes('exports.Prisma.')
    ) {
      // Client exists, so abort.
      return
    }
  }

  await runCommandTask(
    [
      {
        title: 'Generating the Prisma client...',
        ...generatePrismaCommand(schema),
      },
    ],
    {
      verbose,
      silent,
    },
  )
}
