import { app } from '../app'

export const updateCurrentIDandStage = app.createEvent<{ ID: string, stage: number }>()

export const updateStage = updateCurrentIDandStage.map(({ stage }) => stage)

export const $currentConnectID = app.createStore<string>('first-table')

export const $tableIDs = app.createStore<string[]>([
  'first-table',
  'second-table',
  'third-table',
  'fourth-table',
  'fifth-table',
  'sixth-table',
  'seventh-table',
  'eighth-table',
  'ninth-table',
  'tenth-table',
  'eleventh-table',
  'twelfth-table',
  'thirteenth-table',
  'fourteenth-table',
  'fifteenth-table',
  'left-top-table',
  'right-top-table',
  'left-bottom-table',
  'right-bottom-table'
])

export const $tablesCount = $tableIDs.map((ids) => ids.length)

export const $tableCapacity = app.createStore(6)

export const $stage = app.createStore(2)