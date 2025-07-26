// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
   
    axios.post('http://localhost:3000/auth/me', {}, { withCredentials: true }) 
      .then((res) => {
        console.log('Resposta do /auth/me:', res.data);
        if (res.data && res.data.user) { 
          setUser(res.data.user); 
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar autenticação /auth/me:', error);
        setUser(null);
        setIsAuthenticated(false);
        // Opcional: Remover token/cpf do localStorage aqui se a sessão for inválida
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      });
  }, []); 

  const login = ({ token, user: userData }) => {
    if (!token || !userData) {
      console.error("Resposta inválida do backend:", { token, userData });
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('id', userData.id_usuario);
    setIsAuthenticated(true);
    setUser(userData); 
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email'); 
    localStorage.removeItem('id');
    setIsAuthenticated(false);
    setUser(null); 
  };

  return (
    // 5. **EXPOR O ESTADO 'user' NO CONTEXTO:**
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}