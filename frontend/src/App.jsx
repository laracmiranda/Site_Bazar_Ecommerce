import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import CadastroUser from './pages/CadastroUser';
import Login from './pages/Login';

function App() {

  return <>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CadastroUser />} />
          </Routes>
          
      </AuthProvider>
    </BrowserRouter>
  </>
}

export default App;
