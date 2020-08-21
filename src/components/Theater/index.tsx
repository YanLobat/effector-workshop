import * as React from 'react'
import { useStore } from 'effector-react'

import './Theater.css'
// @ts-ignore
import MapImage from '../../assets/conference-map.svg'
import {tables, width, height} from './tableConfig.json'

import { $user, logout } from '../../models/auth'
import { $users, changeUserTable } from '../../models/users'

const Seats:React.FC<{ id: string; seats: {
  x: number;
  y: number;
}[]}> = ({id, seats}) => {
  const users = useStore($users)
  const seatedUsers = users.filter(({tableID}) => tableID === id);
  return (
    <>
      {seatedUsers.map((user, index) => (
        <div key={index} className='rt-seat' style={{ top: seats[index].y, left: seats[index].x }}>
          <img className='seat-person' src={user.avatar} alt='person avatar' />
        </div>
      ))}
    </>
  )
}

const Rooms:React.FC = () => (
  <>
    {tables.map(({ width, height, id, x, y, seats }, index) => (
      <div
        key={index}
        className='rt-room'
        style={{ width, height, top: y, left: x }}
        onClick={() => changeUserTable(id)}
      >
        <Seats id={id} seats={seats}/>
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
