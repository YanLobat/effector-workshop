import {forward, sample} from 'effector'

import {
  updateCurrentIDandStage,
  $currentConnectID,
  $tableIDs,
  $stage
} from './index'

import {
  $tableUsers
} from '../users/index'

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

forward({
  from: updateCurrentIDandStage.map(({stage}) => stage),
  to: $stage
})