/*import { Plus, Package, Archive, Trash, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ItemCard } from '../components/ItemCard';

export default function MeusItens() {


  return <>
  <div className='flex flex-col' >
    <div className='flex flex-row justify-center items-center gap-96 py-10 px-40'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-[#B06d6d]">Meus Itens</h1>
        <p>Gerencie seus itens</p>
      </div>
      <Link to="/cadastro-item" className="flex flex-row gap-1 bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all justify-center items-center">
            <Plus size={15}/> Adicionar Item
      </Link>
    </div>
    <div className='flex flex-row'>

    </div>
    
    <ItemCard/>
  </div>
  </>;
}*/

import { useEffect, useState } from 'react';
import { Plus, Package, Archive, Trash, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MeusItens() {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await fetch('http://localhost:3000/itens/meus-itens', {
          credentials: 'include', // 
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os itens');
        }

        const dados = await response.json();
        setItens(dados);
      } catch (err) {
        setErro(err.message);
      }
    };

    fetchItens();
  }, []);

  return (
    <div>
      <div className='flex flex-row justify-center items-center gap-96 py-10 px-40'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-[#B06d6d]">Meus Itens</h1>
        <p>Gerencie seus itens</p>
      </div>
      <Link to="/cadastro-item" className="flex flex-row gap-1 bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all justify-center items-center">
            <Plus size={15}/> Adicionar Item
      </Link>
    </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 pb-10">
        {itens.map((item) => (
      <li key={item.id} className="bg-white p-4 shadow-md rounded-xl border">
        <img src={item.imagem} alt={item.nome} className="w-full h-40 object-cover rounded-md mb-2" />
        <h2 className="text-lg font-semibold">{item.nome}</h2>
        <p className="text-sm text-gray-600">{item.descricao}</p>
        <p className="text-xs text-gray-500 mt-1">Categoria: {item.categoria}</p>
        <p className="text-xs text-gray-500">Status: {item.status_item ? 'Ativo' : 'Inativo'}</p>

        <div className="flex gap-2 mt-3">
          <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
            <SquarePen size={14} /> Editar
          </button>
          <button className="flex items-center gap-1 text-red-600 hover:underline text-sm">
            <Trash size={14} /> Excluir
          </button>
        </div>
      </li>
    ))}
  </ul>
    </div>
  );
}
