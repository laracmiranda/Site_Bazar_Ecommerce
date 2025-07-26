import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Archive, ShoppingBag, LogOut, Menu, X, SquareChevronUp, SquareChevronDown } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log('Usuário no Navbar:', user);
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

  const [propostasOpen, setPropostasOpen] = useState(false);

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
              <div className="relative">
                  <button
                    onClick={() => setPropostasOpen(!propostasOpen)}
                    className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]"
                  >
                    <ShoppingBag size={15} />
                    Propostas
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${propostasOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {propostasOpen && (
                    <div className="absolute right-0 mt-2 w-48 text-sm bg-[#f8f8f8] border rounded shadow-md z-50">
                      <Link
                        to="/recebidas"
                        onClick={() => setPropostasOpen(false)}
                        className="block px-4 py-2 text-[#4E4E4E] text-center hover:bg-[##f1f1f1]"
                      >
                        Propostas recebidas
                      </Link>
                      <Link
                        to="/feitas"
                        onClick={() => setPropostasOpen(false)}
                        className="block px-4 py-2 text-[#4E4E4E] text-sm text-center hover:bg-[#f1f1f1]"
                      >
                        Propostas realizadas
                      </Link>
                    </div>
                  )}
                </div>


              {user && (
              <div
                title={user.nome}
                className="w-8 h-8 rounded-full bg-[#B06D6D] text-white flex items-center justify-center font-bold text-sm"
              >
                {user.nome?.charAt(0).toUpperCase()}
              </div>
            )}
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
              {user && (
              <div
                title={user.nome}
                className="w-8 h-8 rounded-full bg-[#B06D6D] text-white flex items-center justify-center font-bold text-sm"
              >
                {user.nome?.charAt(0).toUpperCase()}
              </div>
              )}
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Home size={15} /> Home
              </Link>
              <Link to="/meus-itens" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
                <Archive size={15} /> Meus itens
              </Link>
             <Link
                to="/recebidas"
                onClick={() => { setMenuOpen(false); setPropostasOpen(false); }}
                className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]"
              >
                <SquareChevronDown size={15} />
                Propostas recebidas
              </Link>

              <Link
                to="/feitas"
                onClick={() => { setMenuOpen(false); setPropostasOpen(false); }}
                className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]"
              >
                <SquareChevronUp size={15} />
                Propostas realizadas
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