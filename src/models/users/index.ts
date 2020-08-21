import {app} from '../app'

import { UsersMap, TableIDUsersMap, FirebaseUser } from './types'

export const changeUserTable = app.createEvent<string>()
export const updateUsers = app.createEvent<UsersMap>()

export const fetchUsersFx = app.createEffect<void, UsersMap>()
export const addUserFx = app.createEffect<FirebaseUser, string[]>()
export const updateUsersTableFx = app.createEffect<{ id: string;  tableID: string}, unknown>()
export const deleteUserFx = app.createEffect<string, unknown>()

export const $firebaseUsers = app.createStore<UsersMap>({});
export const $users = $firebaseUsers.map((fUsers) =>
  Object.keys(fUsers).map((id) => fUsers[id])
)
export const $usersByEmail = $firebaseUsers.map((fUsers) => {
  return Object.keys(fUsers).reduce<UsersMap>((usersByEmail, id) => {
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

export const $tableUsers = $firebaseUsers.map((fUsers) => {
  return Object.keys(fUsers).reduce<TableIDUsersMap>((tableUsers, id) => {
    const tableID = fUsers[id].tableID;
    if (tableUsers[tableID] !== undefined) {
      tableUsers[tableID].push(fUsers[id]);
      return tableUsers;
    }
    return {
      ...tableUsers,
      [tableID]: [fUsers[id]]
    }
  }, {})
})

export const $usersCount = $firebaseUsers.map((fUsers) =>
  Object.keys(fUsers).length
)