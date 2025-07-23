import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Registro from './pages/Login/Registro';
import Login from './pages/Login/Login';
import MeusItens from './pages/Itens/MeusItens';
import Propostas from './pages/Propostas/Propostas';
import CadastroItem from './pages/Itens/CadastroItem';
import EditarItem from './pages/Itens/EditarItem';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';

function App() {
  const { isAuthenticated } = useAuth();

  return <>
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      { !isAuthenticated && (
        <>
          <Route path="/login" element={<Login/>} />
          <Route path="/registro" element={<Registro />} />
        </>
      )}
            
      {/*Rotas protegidas */}
      <Route path="/meus-itens" element={<PrivateRoute><MeusItens /></PrivateRoute> } />
      <Route path="/cadastro-item" element={<PrivateRoute><CadastroItem /></PrivateRoute>} />
      <Route path="/editar-item/:id" element={<PrivateRoute><EditarItem /></PrivateRoute>} />
      <Route path="/propostas" element={<PrivateRoute><Propostas /></PrivateRoute>} />
            
    </Routes>
    <ToastContainer position="bottom-right" autoClose={3000} />
  </BrowserRouter>
  </>
}

export default App;
