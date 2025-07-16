import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Login from './pages/Login';
import MeusItens from './pages/MeusItens';
import Propostas from './pages/Propostas';
import CadastroItem from './pages/CadastroItem';

function App() {

  return <>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/meus-itens" element={<MeusItens />} />
            <Route path="/propostas" element={<Propostas />} />
            <Route path="/cadastro-item" element={<CadastroItem />} />
          </Routes>
          
      </AuthProvider>
    </BrowserRouter>
  </>
}

export default App;
