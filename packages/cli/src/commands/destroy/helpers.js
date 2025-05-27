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

export function createHandler(componentName) {
  return async (argv) => {
    const importedHandler = await import(`./${componentName}Handler.js`)

    return importedHandler(argv)
  }
}
