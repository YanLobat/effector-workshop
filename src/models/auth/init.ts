import { forward, sample, guard } from 'effector'
import { auth } from 'firebase'

import {
  gSignIn,
  signIn,
  logout,
  updateSignInForm,
  checkAuth,
  restoredAuth,
  manageGmailProviderFx,
  manageEmailProviderFx,
  signUpViaEmailFx,
  checkAuthFx,
  dropUserAuthFx,
  $user,
  $signInForm
} from './'

import {
  addUserFx,
  updateUsersTableFx,
  deleteUserFx,
  $firebaseUsers,
  $usersByEmail
} from '../users'

import { User } from './types'

const gProvider = new auth.GoogleAuthProvider()

manageGmailProviderFx.use(async () => {
  const { user } = await auth().signInWithPopup(gProvider)
  if (user === null) {
    throw 'no user found while gmail auth'
  }
  const email = user.email === null ? '' : user.email
  const fullName = user.displayName === null ? '' : user.displayName
  const avatar = user.photoURL!.replace('https', 'http')
  return {email, avatar, fullName}
})

manageEmailProviderFx.use(async ({email, password}) => {
  await auth().signInWithEmailAndPassword(email, password)
  return {email}
});

signUpViaEmailFx.use(async ({email, password}) => {
  await auth().createUserWithEmailAndPassword(email, password)
  return {email}
})

checkAuthFx.use(() => {
  auth().onAuthStateChanged(value => {
    if (value !== null) {
      checkAuth(value as User)
    }
  })
})

dropUserAuthFx.use(async () => {
  await auth().signOut()
})

$user
.reset(logout)
.on([
  manageGmailProviderFx.doneData, signUpViaEmailFx.doneData, manageEmailProviderFx.doneData, restoredAuth
  ],
  (_, user) => user
)
.on(addUserFx.doneData, (user, [_, id]) => ({
  ...user,
  id
}))

$signInForm
.on(updateSignInForm, (form, {fieldName, value}) => ({
  ...form,
  [fieldName]: value
}))

forward({
  from: gSignIn,
  to: manageGmailProviderFx
})

forward({
  from: signIn,
  to: manageEmailProviderFx
})

forward({
  from: manageEmailProviderFx.fail.filterMap(({ params, error = {} }) => {
    // @ts-ignore
    if (error.code && error.code.includes('user-not-found')) {
      return params;
    }
  }),
  to: signUpViaEmailFx
})

sample({
  source: guard({
    source: sample({
      source: $usersByEmail,
      clock: [
        manageGmailProviderFx.doneData,
        signUpViaEmailFx.doneData,
        manageEmailProviderFx.doneData
      ],
      fn: (users, user) => users[user.email]
    }),
    filter: Boolean
  }),
  fn: (user) => user.id!,
  target: deleteUserFx
})

forward({
  from: logout,
  to: dropUserAuthFx
})

forward({
  from: checkAuth.filterMap((user) => {
    if (user !== null) {
      return user
    }
  }),
  to: restoredAuth
})