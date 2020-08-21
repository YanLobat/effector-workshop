import { app } from '../app'

export const redirect = app.createEvent<string>()

export const $router = app.createStore<string[]>([])