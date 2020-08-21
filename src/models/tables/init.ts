import {forward, sample, guard} from 'effector'

import {
  updateCurrentIDandStage,
  updateStage,
  $currentConnectID,
  $tableIDs,
  $stage,
  $tableCapacity
} from './'

import {
  $tableUsers
} from '../users'

sample({
  source: {
    tableIDs: $tableIDs,
    stage: $stage
  },
  clock: $tableUsers,
  fn: ({tableIDs, stage}, tableUsers) => {
    for (let i = 0; i < tableIDs.length; i++) {
      const currentID = tableIDs[i]
      const tableWithNoUsers = tableUsers[currentID] === undefined

      if (tableWithNoUsers || tableUsers[currentID].length < stage) {
        return {ID: currentID, stage}
      }
    }

    return {ID: tableIDs[0], stage: stage + 1}
  },
  target: updateCurrentIDandStage
})

forward({
  from: updateCurrentIDandStage.map(({ID}) => ID),
  to: $currentConnectID
})

guard({
  source: updateStage,
  filter: sample({
    source: $tableCapacity,
    clock: updateStage,
    fn: (capacity, stage) => stage <= capacity
  }),
  target: $stage
})