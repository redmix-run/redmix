globalThis.__dirname = __dirname
// Load shared mocks
import '../../../../lib/test'

import path from 'path'

import { test, expect } from 'vitest'
import yargs from 'yargs/yargs'

// @ts-expect-error - importing js
import * as directive from '../directive.js'
// @ts-expect-error - importing js
import * as directiveHandler from '../directiveHandler.js'

test('creates a JavaScript validator directive', async () => {
  const output = await directiveHandler.files({
    name: 'require-admin', // checking camel casing too!
    typescript: false,
    tests: true,
    type: 'validator',
  })

  const expectedOutputPath = path.normalize(
    '/path/to/project/api/src/directives/requireAdmin/requireAdmin.js',
  )
  const expectedTestOutputPath = path.normalize(
    '/path/to/project/api/src/directives/requireAdmin/requireAdmin.test.js',
  )

  expect(Object.keys(output)).toContainEqual(expectedOutputPath)
  expect(Object.keys(output)).toContainEqual(expectedTestOutputPath)
  expect(output[expectedOutputPath]).toMatchSnapshot('js directive')
  expect(output[expectedTestOutputPath]).toMatchSnapshot('js directive test')
})

test('creates a TypeScript transformer directive', async () => {
  const output = await directiveHandler.files({
    name: 'bazinga-foo_bar', // checking camel casing too!
    typescript: true,
    tests: true,
    type: 'transformer',
  })

  const expectedOutputPath = path.normalize(
    '/path/to/project/api/src/directives/bazingaFooBar/bazingaFooBar.ts',
  )
  const expectedTestOutputPath = path.normalize(
    '/path/to/project/api/src/directives/bazingaFooBar/bazingaFooBar.test.ts',
  )

  expect(Object.keys(output)).toContainEqual(expectedOutputPath)
  expect(Object.keys(output)).toContainEqual(expectedTestOutputPath)
  expect(output[expectedOutputPath]).toMatchSnapshot('ts directive')
  expect(output[expectedTestOutputPath]).toMatchSnapshot('ts directive test')
})

test('keeps Directive in name', async () => {
  const isPromiseLike = <T>(obj: unknown): obj is Promise<T> => {
    if (!!obj && typeof obj === 'object') {
      if ('then' in obj) {
        return true
      }
    }

    return false
  }

  const argv = yargs()
    .command('directive <name>', false, directive.builder)
    .parse('directive BazingaDirective')

  const name = isPromiseLike(argv) ? (await argv).name : argv.name

  expect(name).toEqual('BazingaDirective')
})
