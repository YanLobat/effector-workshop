import {createStore, createEvent} from 'effector'

export const updateCurrentIDandStage = createEvent<{ ID: string, stage: number }>()

export const updateStage = updateCurrentIDandStage.map(({ stage }) => stage)

export const $currentConnectID = createStore<string>('first-table')

export const $tableIDs = createStore<string[]>([
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

export const $tableCapacity = createStore(6)

export const $stage = createStore(2)