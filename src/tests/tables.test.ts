// failed to join full table
import { fork, allSettled, Scope } from 'effector'

import '../models/init'
import {app, showErrorFx} from '../models/app'
import { signIn } from '../models/auth'
import { fetchUsersFx, $firebaseUsers, updateUsersTableFx, dropUsersFx, changeUserTable } from '../models/users'
import { $tableCapacity } from '../models/tables'

let scope: Scope

beforeEach((done) => {
  dropUsersFx().then(() => done())
});

afterEach((done) => {
  dropUsersFx().then(() => done())
})

test('should fail to change table if table is full', async () => {
  const emails = [
    'ewaters@hotmail.com',
    'alias@aol.com',
    'temmink@gmail.com',
    'rfoley@att.net',
    'yruan@me.com',
    'parents@gmail.com'
  ]
  const userEmail =  'shrapnull@att.net'
  const password = '123456'
  const showErrorMock = jest.fn()
  scope = fork(app, {
    handlers: new Map([[showErrorFx, showErrorMock]])
  })
  await Promise.all([emails.map(async (email) => {
    await allSettled(signIn, {
      scope,
      params: {email, password}
    })
  })])
  await allSettled(fetchUsersFx, {
    scope
  })
  const users = scope.getState($firebaseUsers)
  await Promise.all([Object.keys(users).map(async (id) => {
    await allSettled(updateUsersTableFx, {
      scope,
      params: { id, tableID: 'first-table' }
    })
  })])

  await allSettled(signIn, {
    scope: scope,
    params: {email: userEmail, password}
  })

  const allUsers = scope.getState($firebaseUsers)
  await allSettled(changeUserTable, {
    scope: scope,
    params: 'first-table' 
  })

  expect(scope.getState($tableCapacity)).toBeLessThan(Object.keys(allUsers).length)
  expect(showErrorMock).toHaveBeenCalledTimes(1)
  expect(showErrorMock).toHaveBeenCalledWith('Table is full. You shall not pass!')
})
