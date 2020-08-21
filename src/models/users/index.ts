import {createEvent, createEffect, createStore} from 'effector';

import { UsersMap, TableIDUsersMap, FirebaseUser } from './types'

export const changeUserTable = createEvent<string>()
export const updateUsers = createEvent<UsersMap>()

export const fetchUsersFx = createEffect<void, UsersMap>()
export const addUserFx = createEffect<FirebaseUser, string[]>()
export const updateUsersTableFx = createEffect<{ id: string;  tableID: string}, unknown>()
export const deleteUserFx = createEffect<string, unknown>()

export const $firebaseUsers = createStore<UsersMap>({});
export const $users = $firebaseUsers.map((fUsers) =>
  Object.keys(fUsers).map((id) => fUsers[id])
)
export const $usersByEmail = $firebaseUsers.map((fUsers) => {
  return Object.keys(fUsers).reduce((usersByEmail, id) => {
    const email = fUsers[id].email;
    return {
      [email]: {
        id,
        ...fUsers[id]
      }
      ...usersByEmail
    }
  }, {})
})