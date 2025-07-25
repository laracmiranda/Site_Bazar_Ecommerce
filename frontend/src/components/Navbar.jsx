import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Archive, ShoppingBag, LogOut, Menu, X, SquareChevronUp, SquareChevronDown } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false); // Fecha o menu ao sair
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
  const handleScroll = () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
      navbar.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-md');
    } else {
      navbar.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-md');
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id='navbar' className="fixed top-0 w-full z-50 bg-white drop-shadow-sm border-b border-gray-200 py-4 px-6 md:px-30">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="./icons/logo.svg" alt="Logo" className="w-10 md:w-12" />
          <span className="text-2xl font-bold text-[#B06D6D]">bazar.</span>
        </div>

        {/* Botão de menu (visível apenas no mobile) */}
        <button onClick={toggleMenu} className="md:hidden text-[#4E4E4E]">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Home size={15} /> Home
              </Link>
              <Link to="/login" className="text-[#4E4E4E] text-sm hover:text-[#B06D6D]">Login</Link>
              <Link to="/registro" className="bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all">
                Cadastre-se
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Home size={15} /> Home
              </Link>
              <Link to="/meus-itens" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Archive size={15} /> Meus itens
              </Link>
              <Link to="/recebidas" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <ShoppingBag size={15} /> Propostas
              </Link>
              <button onClick={handleLogout} className="flex items-center bg-[#D9D9D9] gap-1 text-[#4E4E4E] text-sm px-4 py-2 rounded-lg hover:bg-[#b6b3b3] transition-all">
                <LogOut size={15} /> Sair
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="flex flex-col items-center justify-center gap-3 mt-4 md:hidden">
          {!isAuthenticated ? (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Home size={15} /> Home
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-[#4E4E4E] text-sm hover:text-[#B06D6D]">Login</Link>
              <Link to="/registro" onClick={() => setMenuOpen(false)} className="bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all">
                Cadastre-se
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Home size={15} /> Home
              </Link>
              <Link to="/meus-itens" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Archive size={15} /> Meus itens
              </Link>
              {/* ícone de propostas recebidas */}
             <Link to="/recebidas" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <SquareChevronDown size={15}/>Propostas recebidas
             </Link>

               {/* ícone de propostas feitas */}
             <Link to="/feitas" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <SquareChevronUp size={15}/> Propostas feitas
         </Link>
              <button onClick={handleLogout} className="flex items-center bg-[#D9D9D9] gap-1 text-[#4E4E4E] text-sm px-4 py-2 rounded-lg hover:bg-[#b6b3b3] transition-all">
                <LogOut size={15} /> Sair
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
