import { Router, Route } from '@redmix/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home"/>
    </Router>
  )
}

export default Routes
