/* eslint-env vitest */

import { vi } from 'vitest'

// mock Telemetry for CLI commands so they don't try to spawn a process
vi.mock('@redmix/telemetry', () => {
  return {
    errorTelemetry: () => vi.fn(),
    timedTelemetry: () => vi.fn(),
  }
})
