// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home } from 'lucide-react'; // opcional, ícone

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
  }

  return (
    <nav className="bg-white drop-shadow-xl py-4 px-6 md:px-30 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div>
          <img src="./icons/logo.svg" alt="Logo" className='w-10 md:w-12'/>
        </div>
        <span className="text-2xl font-bold text-[#B06D6D]">bazar.</span>
      </div>

      {/* Links */}
      {!isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
            <Home size={15} /> Home
          </Link>
          <Link to="/login" className="text-[#4E4E4E] text-sm hover:text-[#B06D6D]">Login</Link>
          <Link to="/cadastro" className="bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all">
            Cadastre-se
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
            <Home size={15} /> Home
          </Link>
          <Link to="/login" className="text-[#4E4E4E] text-sm hover:text-[#B06D6D]">Login</Link>
          <button type='button' onClick={handleLogout} className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all">
            Sair
          </button>
        </div>
      )}
    </nav>
  );
}
