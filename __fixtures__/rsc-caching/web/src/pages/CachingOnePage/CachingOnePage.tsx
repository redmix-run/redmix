import { Link } from '@redmix/router/Link'
import { namedRoutes as routes } from '@redmix/router/namedRoutes'
import { Metadata } from '@redmix/web/Metadata'

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
