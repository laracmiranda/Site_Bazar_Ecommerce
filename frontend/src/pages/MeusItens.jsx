// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function MeusItens() {
  return <>
    <h1 className="text-2xl">Página Inicial</h1>
    <Link to="/cadastro-item" className="bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all">
            + Adicionar Item
    </Link>
  </>;
}