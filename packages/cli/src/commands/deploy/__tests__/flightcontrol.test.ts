import { vi, describe, it, expect, afterAll, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import yargs from 'yargs'

import { builder } from '../flightcontrol.js'
import { handler } from '../flightcontrolHandler.js'

vi.mock('path')
vi.mock('execa')
vi.mock('fs-extra')
vi.mock('@cedarjs/project-config', async (importOriginal) => {
  const originalProjectConfig: object = await importOriginal()

  return {
    ...originalProjectConfig,
    getPaths: () => ({
      base: `${__dirname}/fixtures`,
    }),
  }
})
vi.mock('@cedarjs/cli-helpers', async (importOriginal) => {
  const originalCliHelpers: object = await importOriginal()

  return {
    ...originalCliHelpers,
    recordTelemetryAttributes: vi.fn(),
  }
})

vi.spyOn(console, 'log').mockImplementation(() => {})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('builder', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should parse side', async () => {
    const subject = builder(yargs(['--side', 'api']))

    expect(subject).not.toBeUndefined()
    const parsed = await subject.parseAsync()
    expect(parsed).toHaveProperty('side', 'api')
  })

  it('should parse prisma "true"', async () => {
    const subject = builder(yargs(['--prisma']))

    expect(subject).not.toBeUndefined()
    const parsed = await subject.parseAsync()
    expect(parsed).toHaveProperty('prisma', true)
  })

  it('should parse prisma "false"', async () => {
    const subject = builder(yargs(['--prisma', 'false']))

    expect(subject).not.toBeUndefined()
    const parsed = await subject.parseAsync()
    expect(parsed).toHaveProperty('prisma', false)
  })
})

describe('handler', () => {
  beforeEach(async () => {
    vi.resetAllMocks()

    const execa = await import('execa')
    const cmdMock = execa.command as unknown as Mock
    cmdMock.mockImplementation(() => Promise.resolve({ stdout: 'mocked' }))
  })

  describe('side: web', () => {
    it('should have called recordTelemetryAttributes', async () => {
      await handler({
        side: 'web',
        serve: false,
        prisma: false,
        dm: false,
      })

      const { recordTelemetryAttributes } = await import('@cedarjs/cli-helpers')
      expect(recordTelemetryAttributes).toHaveBeenCalled()
    })

    it('should have non-zero exit code when build fails', async () => {
      const execa = await import('execa')
      const cmdMock = execa.command as unknown as Mock
      cmdMock.mockImplementation(() => Promise.resolve({ failed: true }))

      await expect(
        handler({
          side: 'web',
          serve: false,
          prisma: false,
          dm: false,
        }),
      ).rejects.toThrow('Command (yarn rw build web --verbose) failed')
    })
  })
})
