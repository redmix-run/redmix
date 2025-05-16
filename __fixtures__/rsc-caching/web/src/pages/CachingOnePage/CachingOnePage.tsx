import { Link } from '@cedarjs/router/Link'
import { namedRoutes as routes } from '@cedarjs/router/namedRoutes'
import { Metadata } from '@cedarjs/web/Metadata'

const CachingOnePage = () => {
  return (
    <>
      <Metadata title="CachingOne" description="CachingOne page" />

      <h1>CachingOnePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CachingOnePage/CachingOnePage.tsx</code>
      </p>
      {/*
        My default route is named <code>cachingOne</code>, link to me with `
        <Link to={routes.cachingOne()}>CachingOne</Link>`
      */}
    </>
  )
}

export default CachingOnePage
