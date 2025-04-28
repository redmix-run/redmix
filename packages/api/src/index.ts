import { createRequire } from 'node:module'

export * from './auth/index.js'
export * from './errors.js'
export * from './validations/validations.js'
export * from './validations/errors.js'
export * from './types.js'
export * from './transforms.js'
export * from './cors.js'
export * from './event.js'

const customRequire = createRequire(process.env.RWJS_CWD || process.cwd())

const packageJson = customRequire('@redmix/api/package.json')
export const prismaVersion = packageJson?.dependencies['@prisma/client']
export const redwoodVersion = packageJson?.version
