import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import  Login  from "./pages/Login";
import { Register } from "./pages/Register";
import {AuthProvider} from './context/authContext'

function App() {
  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
    </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;