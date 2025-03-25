import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App  