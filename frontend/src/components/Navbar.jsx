// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative z-10">
      <Link to="/" className="text-2xl font-bold text-purple-600">
        MinhaLogo
      </Link>

      <button
        className="lg:hidden text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <ul className={`lg:flex lg:space-x-6 absolute lg:static bg-white w-full left-0 top-16 lg:top-0 p-4 lg:p-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'} lg:block`}>
        <li>
          <Link to="/" className="block py-2 text-gray-700 hover:text-purple-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/MeusItens" className="block py-2 text-gray-700 hover:text-purple-600">
            Sobre
          </Link>
        </li>
        <li>
          <Link to="/contato" className="block py-2 text-gray-700 hover:text-purple-600">
            Contato
          </Link>
        </li>
      </ul>
    </nav>
  );
}
