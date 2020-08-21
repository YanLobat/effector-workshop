import * as React from 'react'

import './Theater.css'
// @ts-ignore
import MapImage from '../../assets/conference-map.svg'
import {tables, width, height} from './tableConfig.json'

export const Theater: React.FC = () => {
  const firstTable = tables[0]

  return (
    <div className='remo-theater' style={{width, height}}>
      <div className='rt-app-bar'>
        {/**
          * Show user profile pic/name after login
          */}
        <a href='javascript:;'>Logout</a>
      </div>
      <div className='rt-rooms'>
        {/**
          * Create rooms here as in the requirement and make sure it is aligned with background
          */}
        <div className='rt-room' style={{width: firstTable.width, height: firstTable.height, top: firstTable.y, left: firstTable.x}}><div className='rt-room-name'>{firstTable.id}</div></div>
      </div>
      <div className='rt-background'>
        <img src={MapImage} alt='Conference background'/>
      </div>
    </div>
  )
}
