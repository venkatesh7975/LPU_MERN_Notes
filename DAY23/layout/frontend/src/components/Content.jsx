import React from 'react'
import Ads from './Ads'
import Code from './Code'
import './Content.css'

export default function Content() {
  return (
    <div className='content'>
        <Ads/>
        <Code/>
    </div>
  )
}
