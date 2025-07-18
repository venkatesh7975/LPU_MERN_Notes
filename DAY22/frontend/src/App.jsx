import React from 'react'
import Chat from './components/Chat';
import { BrowserRouter, Routes, Route } from'react-router-dom';

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Chat />} />
   </Routes>
   </BrowserRouter>
  )
}
