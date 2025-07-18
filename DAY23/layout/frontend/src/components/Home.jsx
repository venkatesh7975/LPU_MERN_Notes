import React from 'react'
import Dropdown from './Dropdown'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Content from './Content'

export default function Home() {
  return (
    <div style={{backgroundColor:'lightblue',height:"100vh"}}>
        <Dropdown user="sai"/>
        <Navbar/>
        <div style={{display:"flex"}}>     
        <Sidebar/>
        <Content/>

        </div>
  

    </div>
  )
}
