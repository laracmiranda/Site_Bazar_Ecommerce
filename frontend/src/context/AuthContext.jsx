// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.post('/auth/sessao');
        setUsuario(data.usuario);
      } catch {
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  async function login(email, senha) {
    await api.post('/auth/login', { email, senha });
    const { data } = await api.post('/auth/me');
    setUsuario(data.usuario);
  }

  async function logout() {
    await api.post('/auth/logout');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}
