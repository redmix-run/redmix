import type { TagDescriptor } from '@cedarjs/web'

import App from './App.js'
import { Document } from './Document.js'

interface Props {
  css: string[]
  meta?: TagDescriptor[]
}

export const ServerEntry: React.FC<Props> = ({ css, meta }) => {
  return (
    <Document css={css} meta={meta}>
      <App />
    </Document>
  )
}
