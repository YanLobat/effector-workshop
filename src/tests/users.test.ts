// try to sign in same user multiple times
import { fork, allSettled, Scope } from 'effector'

import '../models/init'
import { app } from '../models/app'
import {dropUsersFx} from '../models/users'
import { signIn, $user } from '../models/auth'

beforeEach((done) => {
  dropUsersFx().then(() => done())
});

afterEach((done) => {
  dropUsersFx().then(() => done())
})

test('should drop previous session if new login from same user', async () => {
  const expected = {email: 'test@test.com'}
  const payload = { password: '123456', ...expected }

  const scope = fork(app)
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  const desktopUser = scope.getState($user)
  await allSettled(signIn, {
    scope: scope,
    params: payload
  })
  const mobileUser = scope.getState($user)
  expect(mobileUser.id === desktopUser.id).toBeFalsy()
})

