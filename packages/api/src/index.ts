import { createRequire } from 'node:module'

export * from './auth/index.js'
export * from './errors.js'
export * from './validations/validations.js'
export * from './validations/errors.js'
export * from './types.js'
export * from './transforms.js'
export * from './cors.js'
export * from './event.js'

const customRequire =
  typeof require === 'function'
    ? require
    : createRequire(process.env.RWJS_CWD || process.cwd())

const rxApiPath = customRequire.resolve('@redmix/api')
const rxApiRequire = customRequire(rxApiPath)

const packageJson = rxApiRequire('./package.json')
export const prismaVersion = packageJson?.dependencies['@prisma/client']
export const redwoodVersion = packageJson?.version
