import { Plus, Package, Archive, Trash, SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';
//import { ItemCard } from "./components/ItemCard"

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
    

  </div>
  </>;
}