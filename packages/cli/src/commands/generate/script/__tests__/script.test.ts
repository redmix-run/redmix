globalThis.__dirname = __dirname
// Load shared mocks
import '../../../../lib/test'

import path from 'path'

import { test, expect } from 'vitest'
import yargs from 'yargs'

// @ts-expect-error - js file
import * as script from '../script.js'
// @ts-expect-error - js file
import * as scriptHandler from '../scriptHandler.js'

test('creates a JavaScript function to execute', async () => {
  const output = await scriptHandler.files({
    name: 'scriptyMcScript',
    typescript: false,
  })

  const expectedOutputPath = path.normalize(
    '/path/to/project/scripts/scriptyMcScript.js',
  )

  expect(Object.keys(output)).toContainEqual(expectedOutputPath)
  expect(output[expectedOutputPath]).toMatchSnapshot()
})

test('creates a TypeScript function to execute', async () => {
  const output = await scriptHandler.files({
    name: 'typescriptyTypescript',
    typescript: true,
  })

  const expectedOutputPath = path.normalize(
    '/path/to/project/scripts/typescriptyTypescript.ts',
  )

  const tsconfigPath = path.normalize('/path/to/project/scripts/tsconfig.json')

  const outputFilePaths = Object.keys(output)

  expect(outputFilePaths).toContainEqual(expectedOutputPath)
  expect(output[expectedOutputPath]).toMatchSnapshot()

  // Should generate tsconfig, because its not present
  expect(outputFilePaths).toContainEqual(tsconfigPath)
})

test('keeps Script in name', async () => {
  const isPromiseLike = <T>(obj: unknown): obj is Promise<T> => {
    if (!!obj && typeof obj === 'object') {
      if ('then' in obj) {
        return true
      }
    }

    return false
  }

  const argv = yargs()
    .command('script <name>', false, script.builder)
    .parse('script BazingaScript')

  const name = isPromiseLike(argv) ? (await argv).name : argv.name

  expect(name).toEqual('BazingaScript')
})
