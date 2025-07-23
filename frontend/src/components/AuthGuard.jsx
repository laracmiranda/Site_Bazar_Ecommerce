// src/components/AuthGuard.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthGuard({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return <p>Carregando...</p>;
  if (!usuario) return <Navigate to="/login" />;

  return children;
}
