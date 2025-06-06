import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@cedarjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'

import Routes from './Routes'

import './index.css'

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <Routes />
    </RedwoodProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
