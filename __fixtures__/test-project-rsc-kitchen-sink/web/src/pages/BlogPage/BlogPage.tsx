import { Link } from '@redmix/router/Link'
import { namedRoutes as routes } from '@redmix/router/namedRoutes'
import { Metadata } from '@redmix/web/Metadata'

const BlogPage = () => {
  return (
    <>
      <Metadata title="Blog" description="Blog page" />

      <h1>BlogPage</h1>
      <p>
        Find me in <code>./web/src/pages/BlogPage/BlogPage.tsx</code>
      </p>
      {/*}
        My default route is named <code>blog</code>, link to me with `
        <Link to={routes.blog()}>Blog</Link>`
      */}
    </>
  )
}

export default BlogPage
