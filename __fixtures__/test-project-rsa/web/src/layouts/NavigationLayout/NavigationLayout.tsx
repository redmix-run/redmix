import { namedRoutes as routes } from '@cedarjs/router/namedRoutes'

import './NavigationLayout.css'

type NavigationLayoutProps = {
  children?: React.ReactNode
}

const Link = (props: any) => {
  return <a href={props.to}>{props.children}</a>
}

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  return (
    <div className="navigation-layout">
      <nav>
        <ul>
          <li>
            <Link to={routes.home()}>Home</Link>
          </li>
          <li>
            <Link to={routes.about()}>About</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default NavigationLayout
