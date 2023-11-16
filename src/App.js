import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import  Login  from "./pages/Login";
import { Register } from "./pages/Register";
import {AuthProvider} from './context/authContext'
import Backlog from './pages/Backlog';
import Planner from './pages/Planner';

function App() {
  return (
    <div>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/backlog" element={<Backlog/>} />
        <Route path="/planner" element={<Planner/>} />
    </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;