import React from 'react'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import Counter from './Counter'
import Products from './Products'

export default function Home() {
  return (
    <div>
        <NavBar/>
        <Sidebar/>
        <Counter/>
        <Hello/>
        <Products/>
    </div>
  )
}
