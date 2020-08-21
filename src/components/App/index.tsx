import * as React from 'react'
import { useStore, useGate } from 'effector-react'

import './App.css'
import { Theater } from '../Theater'
import { Auth } from '../Auth'

import {$router} from '../../models/router'
import {AppGate, Route} from '../../models/app'

export const App = () => {
  useGate(AppGate)
  const [, route] = useStore($router)
  useGate(Route, { name: route ? route : '' })
  
  if (route === 'theater') {
    return <Theater />
  }
  return <Auth />
}