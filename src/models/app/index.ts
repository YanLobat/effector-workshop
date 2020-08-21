import {createDomain} from 'effector'
import { createGate } from 'effector-react'

import { Config } from './types'

export const app = createDomain()

export const initAppFx = app.createEffect<Config, unknown>()

export const showErrorFx = app.createEffect<string, unknown>()

export const AppGate = createGate()

export const Route = createGate<{ name: string }>()
