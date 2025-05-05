import { createHandler } from '../helpers/helpers.js'

export const command = 'netlify'
export const description = 'Setup Netlify deploy'
export const handler = createHandler('netlify')
