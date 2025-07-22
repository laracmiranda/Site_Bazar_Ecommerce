import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Login from './pages/Login';
import MeusItens from './pages/MeusItens';
import Propostas from './pages/Propostas';
import CadastroItem from './pages/CadastroItem';
import EditarItem from './pages/EditarItem';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isAuthenticated } = useAuth();

  return <>
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      { !isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </>
      )}
            
      {/*Rotas protegidas */}
      <Route path="/meus-itens" element={<PrivateRoute><MeusItens /></PrivateRoute> } />
      <Route path="/cadastro-item" element={<PrivateRoute><CadastroItem /></PrivateRoute>} />
      <Route path="/editar-item/:id" element={<PrivateRoute><EditarItem /></PrivateRoute>} />
      <Route path="/propostas" element={<PrivateRoute><Propostas /></PrivateRoute>} />
            
    </Routes>

  </BrowserRouter>
  </>
}

export default App;
