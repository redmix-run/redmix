export function createHandler(componentName) {
  return async (argv) => {
    const importedHandler = await import(
      `../providers/${componentName}Handler.js`
    )

    return importedHandler(argv)
  }
}
