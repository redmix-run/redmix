import redwoodCellsPlugin from '../babelPlugins/babel-plugin-redwood-cell'

const { getWebSideDefaultBabelConfig } = require('@cedarjs/babel-config')

const defaultWebSideBabelConfig = getWebSideDefaultBabelConfig({
  forJest: true,
})

module.exports = {
  ...defaultWebSideBabelConfig,
  overrides: [
    ...defaultWebSideBabelConfig.overrides,
    {
      test: /.+Cell.(js|tsx|jsx)$/,
      plugins: [redwoodCellsPlugin],
    },
  ],
}
