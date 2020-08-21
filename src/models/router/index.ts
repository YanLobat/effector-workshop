import {createEvent, createStore} from 'effector'

export const redirect = createEvent<string>()

export const $router = createStore<string[]>([])