import {createEffect} from 'effector'
import { createGate } from 'effector-react'

import { Config } from './types'

export const initAppFx = createEffect<Config, unknown>()

export const showErrorFx = createEffect<string, unknown>()

export const AppGate = createGate()

export const Route = createGate<{ name: string }>()