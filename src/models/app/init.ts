import { initializeApp } from 'firebase'
import { forward } from 'effector'

import {
  initAppFx, showErrorFx, AppGate, Route
} from './'

import { fetchUsersFx } from '../users'

import { checkAuthFx } from '../auth'

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

showErrorFx.use((text) => {
  alert(text)
})

initAppFx({
  appId,
  projectId,
  apiKey,
  messagingSenderId
})

forward({
  from: AppGate.open,
  to: [fetchUsersFx, checkAuthFx]
})

Route.state.updates.watch(({name}) => {
	history.pushState({}, '', `/${name}`)
})