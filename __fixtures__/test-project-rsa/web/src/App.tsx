import type { ReactNode } from 'react'

import { FatalErrorBoundary, RedwoodProvider } from '@redmix/web'
import { RedwoodApolloProvider } from '@redmix/web/apollo'

import FatalErrorPage from './pages/FatalErrorPage/FatalErrorPage'

import './index.css'

interface AppProps {
  children?: ReactNode
}

const App = ({ children }: AppProps) => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>{children}</RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
