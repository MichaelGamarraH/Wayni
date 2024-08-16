import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Name from './pages/Name'
import Username from './pages/Username'
import Password from './pages/Password'

function App() {


  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/loginname/:id' element={<Name />} />
                <Route path='/loginusername/:id' element={<Username />} />
                <Route path='/loginPassword/:id' element={<Password />} />
            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
