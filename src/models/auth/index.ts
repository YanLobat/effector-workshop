import { createEvent, createEffect, createStore } from 'effector'

import { User } from './types'

export const gSignIn = createEvent()

export const logout = createEvent<string>()

export const manageGmailProviderFx = createEffect<void, User>()

export const $user = createStore<User>({
  email: ''
})