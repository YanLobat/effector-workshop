import * as React from 'react'

import {gSignIn} from '../../models/auth'

export const Auth: React.FC = () => (
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
    <button id='email_signin'>Login with email</button>
    <button id='gapi_signin' onClick={() => gSignIn()}> Login with Google </button>
  </div>
)