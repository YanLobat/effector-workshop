import {forward, sample} from 'effector'

import {database} from 'firebase'

import {
  changeUserTable,
  updateUsers,
  addUserFx,
  fetchUsersFx,
  deleteUserFx,
  updateUsersTableFx,
  dropUsersFx,
  $firebaseUsers,
  $usersByEmail,
  $tableUsers
} from './'

import {
  $user,
  manageGmailProviderFx,
  manageEmailProviderFx,
  signUpViaEmailFx
} from '../auth'

import {
  $currentConnectID,
  $tableCapacity
} from '../tables'

import {
  showErrorFx
} from '../app'

const usersRef = database().ref('users/');

usersRef.on('value', (snapshot) => updateUsers(snapshot.val() === null ? {} : snapshot.val()))

addUserFx.use(async (user) => {
  //@ts-ignore
  const {path} = await database().ref('users/').push(user)
  return path.pieces_
});

fetchUsersFx.use(async () => {
  const snapshot = await database().ref('users/').once('value')
  return snapshot.val()
})

updateUsersTableFx.use(async ({id, tableID}) => {
  await database().ref('users/'+id).update({tableID})
})

deleteUserFx.use(async (id) => {
  await database().ref('users/'+id).remove()
})

dropUsersFx.use(async () => {
  await usersRef.remove()
})

$firebaseUsers
.on([fetchUsersFx.doneData, updateUsers], (_, users) => users)
.on(updateUsersTableFx.done, (users, {params}) => {
  const {id, tableID} = params;
  return {
    ...users,
    [id]: {
      ...users[id],
      tableID
    }
  }
})

sample({
  source: $currentConnectID,
  clock: [manageGmailProviderFx.doneData, signUpViaEmailFx.doneData, manageEmailProviderFx.doneData],
  fn: (id, user) => ({...user, tableID: id}),
  target: addUserFx
})

forward({
  from: addUserFx.doneData,
  to: fetchUsersFx
})

const userChangeTable = sample({
  source: {
    user: $user,
    usersByEmail: $usersByEmail,
    tableUsers: $tableUsers,
    tableCapacity: $tableCapacity
  },
  clock: changeUserTable,
  fn: ({user, usersByEmail, tableUsers, tableCapacity}, tableID) => {
    const id = usersByEmail[user.email!].id!
    const canBeUpdated = tableUsers[tableID] === undefined || tableUsers[tableID].length < tableCapacity
    return {id, tableID, canBeUpdated}
  }
})

forward({
  from: userChangeTable.filterMap(({ id, tableID, canBeUpdated }) => {
    if (canBeUpdated) {
      return { id, tableID }
    }
  }),
  to: updateUsersTableFx
})

forward({
  from: userChangeTable.filterMap(({ canBeUpdated }) => {
    if (!canBeUpdated) {
      return 'Table is full. You shall not pass!'
    }
  }),
  to: showErrorFx
})
