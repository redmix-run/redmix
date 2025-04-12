import { FatalErrorBoundary } from '@redmix/web'
import { RedwoodApolloProvider } from '@redmix/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from './Routes'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodApolloProvider>
      <Routes />
    </RedwoodApolloProvider>
  </FatalErrorBoundary>
)

export default App
