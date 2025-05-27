import { createDbAuthClient, createAuth } from '@cedarjs/auth-dbauth-web'
import WebAuthnClient from '@cedarjs/auth-dbauth-web/webAuthn'

const dbAuthClient = createDbAuthClient({ webAuthn: new WebAuthnClient() })

export const { AuthProvider, useAuth } = createAuth(dbAuthClient)
