import fs from 'node:fs'
import path from 'node:path'

export * from './auth/index.js'
export * from './errors.js'
export * from './validations/validations.js'
export * from './validations/errors.js'
export * from './types.js'
export * from './transforms.js'
export * from './cors.js'
export * from './event.js'

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'),
)

export const prismaVersion = packageJson?.dependencies['@prisma/client']
export const redwoodVersion = packageJson?.version
