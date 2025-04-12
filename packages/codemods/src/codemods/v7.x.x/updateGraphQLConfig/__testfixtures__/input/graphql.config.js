const { getPaths } = require('@redmix/internal')

module.exports = {
  schema: getPaths().generated.schema,
}
