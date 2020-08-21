import { forward } from 'effector'
import { auth } from 'firebase'

import {
  gSignIn,
  logout,
  manageGmailProviderFx,
  $user
} from './'

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

$user
.reset(logout)
.on(manageGmailProviderFx.doneData, (_, user) => user)

forward({
  from: gSignIn,
  to: manageGmailProviderFx
})