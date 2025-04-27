export * from './auth/index.js'
export * from './errors.js'
export * from './validations/validations.js'
export * from './validations/errors.js'
export * from './types.js'
export * from './transforms.js'
export * from './cors.js'
export * from './event.js'

// Keeping original functionality for CJS builds to stay 100% backwards
// compatible
const packageJson =
  typeof require === 'function' ? require('../package.json') : {}
export const prismaVersion = packageJson?.dependencies?.['@prisma/client']
export const redwoodVersion = packageJson?.version

// Adding this as a fallback for ESM builds
export async function getPrismaVersion() {
  const { default: apiPackageJson } = await import('@redmix/api/package.json')

  return apiPackageJson?.dependencies?.['@prisma/client']
}

// Adding this as a fallback for ESM builds
export async function getRedwoodVersion() {
  const { default: apiPackageJson } = await import('@redmix/api/package.json')

  return apiPackageJson?.version
}
