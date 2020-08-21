import * as React from 'react'
import { useStore } from 'effector-react'

import './App.css'
import { Theater } from '../Theater'
import { Auth } from '../Auth'

import {$user} from '../../models/auth'

export const App = () => {
  const {email} = useStore($user)
  return email ? (<Theater />) : (<Auth />)
}