import {forward, sample} from 'effector'

import {database} from 'firebase'

import {
  changeUserTable,
  updateUsers,
  addUserFx,
  fetchUsersFx,
  deleteUserFx,
  updateUsersTableFx,
  $firebaseUsers
} from './'

import {
  $user,
  manageGmailProviderFx,
  manageEmailProviderFx,
  signUpViaEmailFx
} from '../auth'

import {
  $currentConnectID
} from '../tables'

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

sample({
  source: $user,
  clock: changeUserTable,
  fn: ({id}, tableID) => ({
    id, tableID
  }),
  target: updateUsersTableFx
})

forward({
  from: addUserFx.doneData,
  to: fetchUsersFx
})