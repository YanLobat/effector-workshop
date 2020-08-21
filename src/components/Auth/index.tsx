import * as React from 'react'
import { useStore } from 'effector-react'

import {$signInForm, gSignIn, signIn, updateSignInForm} from '../../models/auth'

export const Auth: React.FC = () => {
  const [visibility, setVisibility] = React.useState<boolean>(false)
  const { email = '', password = '' } = useStore($signInForm)
  
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1> Remo Coding Challenge Join Room </h1>
      <button id='email_signin' onClick={() => setVisibility(!visibility)}>Login with email</button>
      {
        visibility
        ? <form>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            onChange={event => updateSignInForm({value: event.target.value, fieldName: 'email'})}
            value={email}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            onChange={event => updateSignInForm({value: event.target.value, fieldName: 'password'})}
            value={password}
          />
          <input type='submit' onClick={(e) => {
            e.preventDefault()
            signIn({email, password})
          }}/>
        </form>
        : null
      }
      <button id='gapi_signin' onClick={() => gSignIn()}> Login with Google </button>
    </div>
  )
}