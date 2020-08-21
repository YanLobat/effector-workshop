import { fork, allSettled, Scope } from 'effector'

import '../models/init'
import {app} from '../models/app'
import { signIn, logout, dropUserAuthFx, checkAuthFx, $user } from '../models/auth'

let scope: Scope

test('should sign in via email and password', async () => {
  const expected = {email: 'test@test.com'}
  const payload = { password: '123456', ...expected }

  scope = fork(app)
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  expect(scope.getState($user)).toMatchObject(expected)
})

test('should sign in via email and password', async () => {
  const expected = {email: 'test@test.com'}
  const payload = { password: '123456', ...expected }

  scope = fork(app)
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  expect(scope.getState($user)).toMatchObject(expected)
})

test('should log out', async () => {
  const expected = {email: 'test@test.com'}
  const payload = { password: '123456', ...expected }
  scope = fork(app)
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  expect(scope.getState($user)).toMatchObject(expected)
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  await allSettled(logout, {
    scope: scope,
    params: payload.email
  })
  expect(scope.getState($user)).toMatchObject({email: ''})
})

test('should be still authed if session drops', async () => {
  const expected = {email: 'test@test.com'}
  const payload = { password: '123456', ...expected }
  const dropUserMock = jest.fn()
  scope = fork(app, {
    handlers: new Map([[dropUserAuthFx, dropUserMock]])
  })
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  expect(scope.getState($user)).toMatchObject(expected)
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  await allSettled(logout, {
    scope: scope,
    params: payload.email
  })
  await allSettled(checkAuthFx, {
    scope: scope
  })
  expect(dropUserMock).toBeCalledTimes(1)
})
