import { useState } from 'react'
import Home from './pages/Home'
import './App.css'
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
    <div  >
     <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
     </div>
    </>
  )
}

export default App
