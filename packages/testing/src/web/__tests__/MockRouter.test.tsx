import React from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Private is deprecated, but we still want to test it so we don't break
// people's projects that still use it.
import { Route, Private } from '@cedarjs/router'

import { routes, Router } from '../MockRouter'

const FakePage = () => <></>

describe('MockRouter', () => {
  it('should correctly map routes', () => {
    render(
      <Router>
        <Route name="a" path="/a" page={FakePage} />
        <Route name="b" path="/b" page={FakePage} />
        <Private unauthenticated="a">
          <Route name="c" path="/c" page={FakePage} />
          <Route name="d" path="/d" page={FakePage} />
        </Private>
      </Router>,
    )

    expect(Object.keys(routes)).toEqual(
      expect.arrayContaining(['a', 'b', 'c', 'd']),
    )
  })
})
