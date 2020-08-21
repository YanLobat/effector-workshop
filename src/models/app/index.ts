import {createEffect} from 'effector'

import { Config } from './types'

export const initAppFx = createEffect<Config, unknown>()