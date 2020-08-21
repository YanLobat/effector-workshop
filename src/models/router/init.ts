import {sample} from 'effector'

import {$user} from '../auth'
import {redirect, $router} from './'

$router.on(redirect, (routes, link) => ([
  ...routes,
  link
]))

sample({
  source: $user,
  fn: (user) => user.email ? 'theater' : '',
  target: redirect
})