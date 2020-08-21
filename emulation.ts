import { fork, allSettled } from 'effector'

import './src/models/init'
import { app } from './src/models/app'
import {fetchUsersFx, updateUsersTableFx, $firebaseUsers} from './src/models/users'
import {signIn}  from './src/models/auth'

const emails = [
  'ewaters@hotmail.com',
  'alias@aol.com',
  'temmink@gmail.com',
  'rfoley@att.net',
  'yruan@me.com',
  'parents@gmail.com',
  'shrapnull@att.net',
  'solomon@msn.com',
  'chrisk@gmail.com',
  'grolschie@mac.com',
  'jschauma@hotmail.com',
  'pplinux@gmail.com',
  'ryanshaw@aol.com',
  'corrada@me.com',
  'mailarc@comcast.net',
  'gravyface@comcast.net',
  'willg@yahoo.ca',
  'gemmell@live.com',
  'mahbub@gmail.com',
  'yenya@aol.com',
  'solomon@live.com',
  'miltchev@optonline.net',
  'evans@outlook.com',
  'leslie@hotmail.com',
  'afeldspar@msn.com',
  'portele@optonline.net',
  'choset@outlook.com',
  'sburke@gmail.com',
  'tellis@gmail.com',
  'mrsam@sbcglobal.net',
  'loscar@optonline.net',
  'vmalik@sbcglobal.net',
  'mdielmann@yahoo.com',
  'karasik@mac.com',
  'pajas@mac.com',
  'chunzi@outlook.com',
  'lipeng@yahoo.ca',
  'nacho@verizon.net',
  'mailarc@outlook.com',
  'ovprit@hotmail.com',
  'demmel@yahoo.ca',
  'mschwartz@live.com',
  'salesgeek@att.net',
  'haddawy@msn.com',
  'novanet@optonline.net',
  'themer@me.com',
  'hellfire@gmail.com',
  'csilvers@icloud.com',
  'sabren@outlook.com',
  'webdragon@comcast.net',
  'ideguy@yahoo.ca',
  'phish@comcast.net',
  'moinefou@yahoo.ca',
  'drolsky@comcast.net',
  'tokuhirom@sbcglobal.net',
  'pkplex@sbcglobal.net',
  'jsnover@icloud.com',
  'jbryan@icloud.com',
  'ismail@aol.com',
  'tezbo@live.com',
  'miturria@comcast.net',
  'daveed@yahoo.ca',
  'yamla@optonline.net',
  'jdhedden@verizon.net',
  'odlyzko@yahoo.com',
  'rogerspl@hotmail.com',
  'sburke@msn.com',
  'cparis@optonline.net',
  'janneh@me.com',
  'vlefevre@gmail.com',
  'heroine@gmail.com',
  'vsprintf@icloud.com',
  'tkrotchko@outlook.com',
  'graham@comcast.net',
  'dburrows@optonline.net',
  'russotto@outlook.com',
  'singh@aol.com',
  'lstaf@sbcglobal.net',
  'pakaste@icloud.com',
  'fwiles@yahoo.ca',
  'jbuchana@comcast.net',
  'gknauss@att.net',
  'drjlaw@icloud.com',
  'rbarreira@yahoo.com',
  'danneng@hotmail.com',
  'jdhedden@yahoo.ca',
  'louise@att.net',
  'papathan@me.com',
  'ghost@aol.com',
  'mcraigw@comcast.net',
  'jfreedma@icloud.com',
  'jhardin@icloud.com',
  'raines@yahoo.ca',
  'hikoza@comcast.net',
  'kodeman@me.com',
  'rhavyn@hotmail.com',
  'burniske@optonline.net',
  'mallanmba@hotmail.com',
  'bester@icloud.com',
  'dprice@outlook.com',
  'dialworld@icloud.com',
  'rgox@msn.com',
  'mxugle@aol.com',
  'cled@icloud.com',
  'mxugle@gmail.com',
  'inn@aol.com',
  'eck@verizon.net',
  'curi@optonline.net',
  'och@me.com',
  'nnen@mac.com',
  'thomas@verizon.net',
  'owell@att.net'
]
const password = '123456'
const testScope = fork(app)

async function startFunc() {
  await Promise.all([emails.map(async (email) => {
    await allSettled(signIn, {
      scope: testScope,
      params: {email, password}
    })
  })])
  await allSettled(fetchUsersFx, {
    scope: testScope
  })
  const users = testScope.getState($firebaseUsers)
  await Promise.all([Object.keys(users).map(async (id) => {
    await allSettled(updateUsersTableFx, {
      scope: testScope,
      params: { id, tableID: 'first-table' }
    })
  })])

}

startFunc()
