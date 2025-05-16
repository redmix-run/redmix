export default `
import { Router, Route } from '@cedarjs/router'

const Routes = () => {
  return (
    <Router>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
`
