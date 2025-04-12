import { Link } from '@redmix/router/Link'
import { namedRoutes as routes } from '@redmix/router/namedRoutes'
import { Metadata } from '@redmix/web/dist/components/Metadata'
// import { Toaster } from '@redmix/web/toast'

import { SignupForm } from './SignupForm'

const SignupPage = () => {
  return (
    <>
      <Metadata title="Signup" />

      <main className="rw-main">
        {/* <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} /> */}
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <SignupForm />
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
