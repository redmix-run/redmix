export function createHandler(componentName) {
  return async function handler(argv) {
    const { handler: importedHandler } = await import(
      `../libraries/${componentName}Handler.js`
    )

    return importedHandler(argv)
  }
}
