// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Archive, LogOut, SquareChevronUp, SquareChevronDown } from 'lucide-react'; // opcional, ícone

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
  }

  return (

    // Navbar completa
    <nav className="bg-white drop-shadow-xl border-b border-gray-200 py-4 px-6 md:px-30 flex justify-between items-center">
      
      <div className="flex items-center gap-2">
        <div>
          <img src="./icons/logo.svg" alt="Logo" className='w-10 md:w-12'/>
        </div>
        <span className="text-2xl font-bold text-[#B06D6D]">bazar.</span>
      </div>


      {!isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
            <Home size={15} /> Home
          </Link>
          <Link to="/login" className="text-[#4E4E4E] text-sm hover:text-[#B06D6D]">Login</Link>
          <Link to="/registro" className="bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all">
            Cadastre-se
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {/* ícone da Home */}
          <Link to="/" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
            <Home size={15} /> Home
          </Link>

          {/* ícone dos meus itens */}
          <Link to="/meus-itens" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
            <Archive size={15}/>Meus itens
          </Link>
         
         {/* ícone de propostas recebidas */}
         <Link to="/recebidas" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
            <SquareChevronDown size={15}/>Propostas recebidas
         </Link>

           {/* ícone de propostas feitas */}
         <Link to="/feitas" className="flex items-center gap-1 text-[#4E4E4E] text-sm hover:text-[#B06D6D]">
            <SquareChevronUp size={15}/> Propostas feitas
         </Link>
        
          <button type='button' onClick={handleLogout} className="flex items-center bg-[#D9D9D9] gap-1 text-[#4E4E4E] text-sm px-4 py-2 rounded-lg hover:bg-[#b6b3b3] transition-all">
          <LogOut size={15} />Sair
          </button>
        </div>
      )}
    </nav>
  );
}
