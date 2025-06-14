import fs from 'node:fs'
import path from 'node:path'

import type { TransformPluginContext, TransformResult } from 'rollup'
import { describe, it, expect } from 'vitest'

import { cedarCellTransform } from '../vite-plugin-cedar-cell.js'

type TransformResultWithCode = Exclude<
  TransformResult,
  null | undefined | void
> & { code: string }

export function expectToBeResultWithCode(
  result: TransformResult,
): asserts result is TransformResultWithCode {
  expect(
    result &&
      typeof result === 'object' &&
      'code' in result &&
      typeof result.code === 'string',
  ).toBe(true)
}

describe('redwoodCellTransform', () => {
  const plugin = cedarCellTransform()
  const pluginTransform = plugin.transform
  const fixturesDir = path.join(import.meta.dirname, '__fixtures__', 'cell')

  const testFixture = async (
    fixtureName: string,
    inputFileName = 'CodeCell.js',
  ) => {
    const fixturePath = path.join(fixturesDir, fixtureName)
    const codePath = path.join(fixturePath, inputFileName)
    const outputPath = path.join(fixturePath, 'output.js')

    const input = fs.readFileSync(codePath, 'utf-8')
    const expectedOutput = fs.readFileSync(outputPath, 'utf-8').trim()

    if (typeof pluginTransform !== 'function') {
      throw new Error('pluginTransform is undefined')
    }

    const result = await pluginTransform.call(
      // The plugin is not using anything on the context, so this is safe
      {} as TransformPluginContext,
      input,
      codePath,
    )

    // Check if this should transform by looking for QUERY or data exports and no default export
    const hasQueryOrData =
      input.includes('export const QUERY') ||
      input.includes('export const data')
    const hasDefaultExport = input.includes('export default')
    const shouldTransform = hasQueryOrData && !hasDefaultExport

    if (!shouldTransform) {
      expect(result).toBeNull()
    } else {
      expectToBeResultWithCode(result)
      expect(result.code).toEqual(expectedOutput)
    }
  }

  it('should handle cell-with-required-exports', async () => {
    await testFixture('cell-with-required-exports')
  })

  it('should handle cell-with-default-export', async () => {
    await testFixture('cell-with-default-export')
  })

  it('should handle cell-with-default-and-other-named-export', async () => {
    await testFixture('cell-with-default-and-other-named-export')
  })

  it('should handle cell-with-commented-exports', async () => {
    await testFixture('cell-with-commented-exports')
  })

  it('should handle server cells with data export', async () => {
    await testFixture('server-cell-with-data-export', 'ServerUserCell.jsx')
  })
})
