import terminalLink from 'terminal-link'
import { titleCase } from 'title-case'

import { recordTelemetryAttributes } from '@redmix/cli-helpers'

export const DEFAULT_SERVER_CONFIG = {
  port: 22,
  branch: 'main',
  packageManagerCommand: 'yarn',
  monitorCommand: 'pm2',
  sides: ['api', 'web'],
  keepReleases: 5,
  freeSpaceRequired: 2048,
}

export const command = 'baremetal [environment]'
export const description = 'Deploy to baremetal server(s)'

export const builder = (yargs) => {
  yargs.positional('environment', {
    describe: 'The environment to deploy to',
    type: 'string',
  })

  yargs.option('first-run', {
    describe:
      'Set this flag the first time you deploy: starts server processes from scratch',
    default: false,
    type: 'boolean',
  })

  yargs.option('df', {
    describe: 'Check available disk space',
    default: true,
    type: 'boolean',
  })

  yargs.option('update', {
    describe: 'Update code to latest revision',
    default: true,
    type: 'boolean',
  })

  yargs.option('install', {
    describe: 'Run `yarn install`',
    default: true,
    type: 'boolean',
  })

  yargs.option('migrate', {
    describe: 'Run database migration tasks',
    default: true,
    type: 'boolean',
  })

  yargs.option('build', {
    describe: 'Run build process for the deployed `sides`',
    default: true,
    type: 'boolean',
  })

  yargs.option('restart', {
    describe: 'Restart server processes',
    default: true,
    type: 'boolean',
  })

  yargs.option('cleanup', {
    describe: 'Remove old deploy directories',
    default: true,
    type: 'boolean',
  })

  yargs.option('releaseDir', {
    describe:
      'Directory to create for the latest release, defaults to timestamp',
    default: new Date()
      .toISOString()
      .replace(/[:\-TZ]/g, '')
      .replace(/\.\d+$/, ''),
    type: 'string',
  })

  yargs.option('branch', {
    describe: 'The branch to deploy',
    type: 'string',
  })

  yargs.option('maintenance', {
    describe: 'Add/remove the maintenance page',
    choices: ['up', 'down'],
    help: 'Put up a maintenance page by replacing the content of web/dist/index.html with the content of web/src/maintenance.html',
  })

  yargs.option('rollback', {
    describe: 'Add/remove the maintenance page',
    help: 'Rollback [count] number of releases',
  })

  yargs.option('verbose', {
    describe: 'Verbose mode, for debugging purposes',
    default: false,
    type: 'boolean',
  })

  // TODO: Allow option to pass --sides and only deploy select sides instead of all, always

  yargs.epilogue(
    `Also see the ${terminalLink(
      'Redwood Baremetal Deploy Reference',
      'https://redwoodjs.com/docs/cli-commands#deploy',
    )}\n`,
  )
}

export const throwMissingConfig = (name) => {
  throw new Error(
    `"${name}" config option not set. See https://redwoodjs.com/docs/deployment/baremetal#deploytoml`,
  )
}

export const verifyConfig = (config, yargs) => {
  if (!yargs.environment) {
    throw new Error(
      'Must specify an environment to deploy to, ex: `yarn rw deploy baremetal production`',
    )
  }

  if (!config[yargs.environment]) {
    throw new Error(`No servers found for environment "${yargs.environment}"`)
  }

  return true
}

export const verifyServerConfig = (config) => {
  if (!config.host) {
    throwMissingConfig('host')
  }

  if (!config.path) {
    throwMissingConfig('path')
  }

  if (!config.repo) {
    throwMissingConfig('repo')
  }

  if (!/^\d+$/.test(config.freeSpaceRequired)) {
    throw new Error('"freeSpaceRequired" must be an integer >= 0')
  }

  return true
}

export const serverConfigWithDefaults = (serverConfig, yargs) => {
  return {
    ...DEFAULT_SERVER_CONFIG,
    ...serverConfig,
    branch: yargs.branch || serverConfig.branch || DEFAULT_SERVER_CONFIG.branch,
  }
}

export const lifecycleTask = (
  lifecycle,
  task,
  skip,
  { serverLifecycle, ssh, cmdPath },
) => {
  if (serverLifecycle[lifecycle]?.[task]) {
    const tasks = []

    for (const command of serverLifecycle[lifecycle][task]) {
      tasks.push({
        title: `${titleCase(lifecycle)} ${task}: \`${command}\``,
        task: async () => {
          await ssh.exec(cmdPath, command)
        },
        skip: () => skip,
      })
    }

    return tasks
  }
}

// wraps a given command with any defined before/after lifecycle commands
export const commandWithLifecycleEvents = ({ name, config, skip, command }) => {
  const tasks = []

  tasks.push(lifecycleTask('before', name, skip, config))
  tasks.push({ ...command, skip: () => skip })
  tasks.push(lifecycleTask('after', name, skip, config))

  return tasks.flat().filter((t) => t)
}

export async function handler(yargs) {
  recordTelemetryAttributes({
    command: 'deploy baremetal',
    firstRun: yargs.firstRun,
    df: yargs.df,
    update: yargs.update,
    install: yargs.install,
    migrate: yargs.migrate,
    build: yargs.build,
    restart: yargs.restart,
    cleanup: yargs.cleanup,
    maintenance: yargs.maintenance,
    rollback: yargs.rollback,
    verbose: yargs.verbose,
  })

  const { handler: baremetalHandler } = await import(
    './baremetal/baremetalHandler'
  )

  return baremetalHandler(yargs)
}
