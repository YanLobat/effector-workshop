import * as React from 'react'
import { useStore, useGate } from 'effector-react'

import './App.css'
import { Theater } from '../Theater'
import { Auth } from '../Auth'

import { $user } from '../../models/auth'
import {AppGate} from '../../models/app'

export const App = () => {
  useGate(AppGate)
  const {email} = useStore($user)
  return email ? (<Theater />) : (<Auth />)
}