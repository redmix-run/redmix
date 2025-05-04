// helper used in Dev and Build commands

import path from 'path'

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

  return {
    cmd: `node "${require.resolve('prisma/build/index.js')}"`,
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
    // The Prisma client throws if it is not generated.
    try {
      const prismaClientPath = path.join(
        getPaths().base,
        'node_modules/.prisma/client/index.js',
      )
      console.log(`Prisma client path: ${prismaClientPath}`)

      // Import the client from the Redmix app's node_modules path.
      const { PrismaClient } = await import(prismaClientPath)

      // eslint-disable-next-line
      new PrismaClient()

      // Client exists, so abort.
      return
    } catch (e) {
      // Client does not exist, continue execution
      // TODO: Look for the expected error message. If we get another error we
      // should print it
      // Expecting:
      // Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
    }
  }

  return await runCommandTask(
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
