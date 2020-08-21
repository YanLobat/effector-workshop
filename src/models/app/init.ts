import { initializeApp } from 'firebase'
import { forward } from 'effector'

import {
  initAppFx, AppGate
} from './'

import { fetchUsersFx } from '../users'

import {
  appId,
  projectId,
  apiKey,
  messagingSenderId
} from '../../../config.json'


initAppFx.use(async ({
  appId,
  projectId,
  apiKey,
  messagingSenderId
}) => {
  await initializeApp({
    appId,
    projectId,
    apiKey,
    messagingSenderId,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    storageBucket: `${projectId}.appspot.com`
  })
})

initAppFx({
  appId,
  projectId,
  apiKey,
  messagingSenderId
})

forward({
  from: AppGate.open,
  to: fetchUsersFx
})