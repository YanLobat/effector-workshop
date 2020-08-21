import { initializeApp } from 'firebase'

import {
  initAppFx
} from './'

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