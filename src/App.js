import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import  Login  from "./pages/Login";
import { Register } from "./pages/Register";
import {AuthProvider} from './context/authContext'
import Backlog from './pages/Backlog';

function App() {
  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/backlog" element={<Backlog/>} />
    </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;