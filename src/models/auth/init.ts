import { forward, sample } from 'effector'
import { auth } from 'firebase'

import {
  gSignIn,
  signIn,
  logout,
  updateSignInForm,
  manageGmailProviderFx,
  manageEmailProviderFx,
  signUpViaEmailFx,
  $user,
  $signInForm
} from './'

import {
  addUserFx,
  updateUsersTableFx
} from '../users'

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

$user
.reset(logout)
.on([
  manageGmailProviderFx.doneData, signUpViaEmailFx.doneData, manageEmailProviderFx.doneData
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