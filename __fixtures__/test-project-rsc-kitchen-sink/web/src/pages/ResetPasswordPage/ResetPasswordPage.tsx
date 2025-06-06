import { Metadata } from '@cedarjs/web/dist/components/Metadata'
// import { Toaster } from '@cedarjs/web/toast'

import { ResetPasswordForm } from './ResetPasswordForm'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  return (
    <>
      <Metadata title="Reset Password" />

      <main className="rw-main">
        {/* <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} /> */}
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Reset Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <ResetPasswordForm resetToken={resetToken} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ResetPasswordPage
