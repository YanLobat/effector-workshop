import * as React from 'react'
import { useStore } from 'effector-react'

import './Theater.css'
// @ts-ignore
import MapImage from '../../assets/conference-map.svg'
import {tables, width, height} from './tableConfig.json'

import {$user, logout} from '../../models/auth'

const Rooms:React.FC = () => (
  <>
    {tables.map(({ width, height, id, x, y, seats }, index) => (
      <div
        key={index}
        className='rt-room'
        style={{ width, height, top: y, left: x }}
      >
        <div className='rt-room-name'>{id}</div>
      </div>
    ))}
  </>
)

export const Theater: React.FC = () => {
  const {avatar, fullName, email} = useStore($user)

  return (
    <div className='remo-theater' style={{width, height}}>
      <div className='rt-app-bar'>
        {avatar
          ? (<><img width='36' height='36' src={avatar} alt='profile pic' /></>)
          : null
        }
        <span className='email'>{fullName ? fullName : email}</span>
        <a href='' onClick={e => logout(email)}>Logout</a>
      </div>
      <div className='rt-rooms'>
        <Rooms />
      </div>
      <div className='rt-background'>
        <img src={MapImage} alt='Conference background'/>
      </div>
    </div>
  )
}
