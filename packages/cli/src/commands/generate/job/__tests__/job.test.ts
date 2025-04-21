globalThis.__dirname = __dirname
// Load shared mocks
import '../../../../lib/test'

import path from 'path'

import { describe, it, expect } from 'vitest'

// @ts-expect-error - job is a JavaScript file
import * as jobHandler from '../jobHandler.js'

describe('Single word default files', async () => {
  const files = await jobHandler.files({
    name: 'Sample',
    queueName: 'default',
    tests: true,
    typescript: true,
  })

  it('creates a single word function file', () => {
    expect(
      files[
        path.normalize('/path/to/project/api/src/jobs/SampleJob/SampleJob.ts')
      ],
    ).toMatchSnapshot()

    expect(
      files[
        path.normalize(
          '/path/to/project/api/src/jobs/SampleJob/SampleJob.test.ts',
        )
      ],
    ).toMatchSnapshot('Test snapshot')

    expect(
      files[
        path.normalize(
          '/path/to/project/api/src/jobs/SampleJob/SampleJob.scenarios.ts',
        )
      ],
    ).toMatchSnapshot('Scenario snapshot')
  })
})

describe('multi-word files', () => {
  it('creates a multi word function file', async () => {
    const multiWordDefaultFiles = await jobHandler.files({
      name: 'send-mail',
      queueName: 'default',
      tests: false,
      typescript: true,
    })

    expect(
      multiWordDefaultFiles[
        path.normalize(
          '/path/to/project/api/src/functions/SendMailJob/SendMailJob.js',
        )
      ],
    ).toMatchSnapshot()
  })
})

describe('generation of js files', async () => {
  const jsFiles = await jobHandler.files({
    name: 'Sample',
    queueName: 'default',
    tests: true,
    typescript: false,
  })

  it('returns tests, scenario and job file for JS', () => {
    const fileNames = Object.keys(jsFiles)
    expect(fileNames.length).toEqual(3)

    expect(fileNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining('SampleJob.js'),
        expect.stringContaining('SampleJob.test.js'),
        expect.stringContaining('SampleJob.scenarios.js'),
      ]),
    )
  })
})
