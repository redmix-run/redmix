import { vi, test, expect } from 'vitest'

import { command, description, builder, handler } from '../setup'

// mock Telemetry for CLI commands so they don't try to spawn a process
vi.mock('@cedarjs/telemetry', () => {
  return {
    errorTelemetry: () => vi.fn(),
    timedTelemetry: () => vi.fn(),
  }
})

test('standard exports', () => {
  expect(command).toEqual('azure-active-directory')
  expect(description).toMatch(/Azure Active Directory/)
  expect(typeof builder).toEqual('function')
  expect(typeof handler).toEqual('function')
})
