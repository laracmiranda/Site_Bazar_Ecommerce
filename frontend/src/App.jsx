// src/App.jsx
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import MeusItens from './pages/MeusItens';
import CadastroItem from './pages/CadastroItem';
import Propostas from './pages/Propostas';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/meus-itens"
            element={
              <AuthGuard>
                <MeusItens />
              </AuthGuard>
            }
          />
          <Route
            path="/cadastro-item"
            element={
              <AuthGuard>
                <CadastroItem />
              </AuthGuard>
            }
          />
          <Route
            path="/propostas"
            element={
              <AuthGuard>
                <Propostas />
              </AuthGuard>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
