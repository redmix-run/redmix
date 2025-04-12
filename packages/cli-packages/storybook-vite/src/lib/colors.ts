import chalk from 'chalk'

/**
 * To keep a consistent color/style palette between cli packages, such as
 * \@redwood/cli and \@redwood/create-redmix-app, please keep them compatible
 * with one and another. We'll might split up and refactor these into a
 * separate package when there is a strong motivation behind it.
 *
 * Current files:
 *
 * - packages/cli/src/lib/colors.js (this file)
 * - packages/create-redmix-app/src/create-redmix-app.js
 */
export default {
  error: chalk.bold.red,
  warning: chalk.keyword('orange'),
  green: chalk.green,
  info: chalk.grey,
  bold: chalk.bold,
  underline: chalk.underline,
}
