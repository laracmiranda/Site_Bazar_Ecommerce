// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, Archive, ShoppingBag, LogOut } from 'lucide-react';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="bg-white drop-shadow-md border-b border-gray-200 py-4 px-6 md:px-20 flex justify-between items-center">
      {/* Logo + Marca */}
      <div className="flex items-center gap-2">
        <img src="/icons/logo.svg" alt="Logo" className="w-10 md:w-12" />
        <span className="text-2xl font-bold text-[#B06D6D]">bazar.</span>
      </div>

      {/* Navegação */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
          <Home size={16} /> Home
        </Link>

        {!usuario && (
          <>
            <Link to="/login" className="text-[#4E4E4E] text-sm hover:text-[#B06D6D]">Login</Link>
            <Link
              to="/registro"
              className="bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-md hover:bg-[#c27a7a] transition"
            >
              Cadastre-se
            </Link>
          </>
        )}

        {usuario && (
          <>
            <Link to="/meus-itens" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
              <Archive size={16} /> Meus Itens
            </Link>
            <Link to="/propostas" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
              <ShoppingBag size={16} /> Propostas
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm bg-[#D9D9D9] px-4 py-2 rounded-md hover:bg-[#b6b3b3] transition"
            >
              <LogOut size={16} className="text-[#4E4E4E]" />
              <span className="text-[#4E4E4E]">Sair</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
