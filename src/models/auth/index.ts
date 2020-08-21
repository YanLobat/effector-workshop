import { app } from '../app'

import { User, Credentials } from './types'

export const gSignIn = app.createEvent()

export const signIn = app.createEvent<Credentials>()

export const logout = app.createEvent<string>()

export const updateSignInForm = app.createEvent<{ value: string; fieldName: string }>()

export const checkAuth = app.createEvent<User | null>()

export const restoredAuth = app.createEvent<User>()

export const manageGmailProviderFx = app.createEffect<void, User>()

export const manageEmailProviderFx = app.createEffect<Credentials, User>()

export const signUpViaEmailFx = app.createEffect<Credentials, { email: string }>()

export const checkAuthFx = app.createEffect<void, unknown>()

export const dropUserAuthFx = app.createEffect<string, unknown>()

export const $user = app.createStore<User>({
  email: ''
})

export const $signInForm = app.createStore<Credentials>({
  email: '',
  password: ''
})