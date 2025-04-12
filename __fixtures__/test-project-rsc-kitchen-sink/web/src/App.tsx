import type { ReactNode } from 'react'

import { FatalErrorBoundary, RedwoodProvider } from '@redmix/web'
import { RedwoodApolloProvider } from '@redmix/web/apollo'

import { AuthProvider, useAuth } from './auth'
import FatalErrorPage from './pages/FatalErrorPage/FatalErrorPage'

import './index.css'
import './scaffold.css'

interface AppProps {
  children?: ReactNode
}

const App = ({ children }: AppProps) => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          {children}
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
