import { Link, routes } from '@redmix/router'
import { MetaTags } from '@redmix/web'

const HomePage = () => {
  console.log(globalThis)

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      {/*
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      */}
    </>
  )
}

export default HomePage
