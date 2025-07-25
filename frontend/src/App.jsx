import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Registro from './pages/Login/Registro';
import Login from './pages/Login/Login';
import MeusItens from './pages/Itens/MeusItens';
import CadastroItem from './pages/Itens/CadastroItem';
import EditarItem from './pages/Itens/EditarItem';
import Propostas from './pages/Propostas/Propostas';
import Recebidas from './pages/Propostas/Recebidas';
import Feitas from './pages/Propostas/Feitas';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />


   
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

    
      {/* Rotas protegidas */}
      <Route path="/meus-itens" element={<PrivateRoute><MeusItens /></PrivateRoute>} />
      <Route path="/cadastro-item" element={<PrivateRoute><CadastroItem /></PrivateRoute>} />
      <Route path="/editar-item/:id" element={<PrivateRoute><EditarItem /></PrivateRoute>} />
      <Route path="/propostas" element={<PrivateRoute><Propostas /></PrivateRoute>} />
      <Route path="/recebidas" element={<PrivateRoute><Recebidas /></PrivateRoute>} />
      <Route path="/feitas" element={<PrivateRoute><Feitas /></PrivateRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
