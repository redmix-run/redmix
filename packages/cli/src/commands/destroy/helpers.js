export const createYargsForComponentDestroy = ({ componentName }) => {
  return {
    command: `${componentName} <name>`,
    description: `Destroy a ${componentName} component`,
    builder: (yargs) => {
      yargs.positional('name', {
        description: `Name of the ${componentName}`,
        type: 'string',
      })
    },
  }
}
