// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // true se existir token
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
