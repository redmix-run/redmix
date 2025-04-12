'use client'

import { navigate, routes } from '@redmix/router'

import { useAuth } from 'src/auth'

export const LogOutButton = () => {
  const { logOut } = useAuth()

  return (
    <button
      style={{ display: 'block', width: 400, margin: '3em auto' }}
      onClick={() => {
        logOut()
        navigate(routes.home())
      }}
    >
      Log Out
    </button>
  )
}
