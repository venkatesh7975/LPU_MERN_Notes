import React from 'react'
import Sidebar from './Sidebar'

export default function Dropdown({user}) {
  return (
    <div style={{color:"yellow",textAlign:'center',margin:"10px",border:"1px solid"}}>
        <h1>Dropdown {user}</h1>

        <Sidebar user={user}/>
       
    </div>
  )
}

