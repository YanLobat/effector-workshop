import { createEvent, createEffect, createStore } from 'effector'

import { User, Credentials } from './types'

export const gSignIn = createEvent()

export const signIn = createEvent<Credentials>()

export const logout = createEvent<string>()

export const updateSignInForm = createEvent<{ value: string; fieldName: string }>()

export const checkAuth = createEvent<User | null>()

export const restoredAuth = createEvent<User>()

export const manageGmailProviderFx = createEffect<void, User>()

export const manageEmailProviderFx = createEffect<Credentials, User>()

export const signUpViaEmailFx = createEffect<Credentials, { email: string }>()

export const checkAuthFx = createEffect<void, unknown>()

export const dropUserAuthFx = createEffect<string, unknown>()

export const $user = createStore<User>({
  email: ''
})

export const $signInForm = createStore<Credentials>({
  email: '',
  password: ''
})