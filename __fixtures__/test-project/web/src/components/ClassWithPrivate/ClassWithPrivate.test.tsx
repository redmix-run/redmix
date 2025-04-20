import { render } from '@redmix/testing/web'

import ClassWithPrivate from './ClassWithPrivate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClassWithPrivate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClassWithPrivate />)
    }).not.toThrow()
  })
})
