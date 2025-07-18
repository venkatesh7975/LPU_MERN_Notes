import React from 'react'

export default function Sidebar({user}) {
  return (
    <div style={{color:"yellow",textAlign:'center',margin:"10px",border:"1px solid",width:"100px",height:"100px"}}>Sidebar
    <p>this prop comes from dropdonw :: {user}</p>
    </div>
  )
}
