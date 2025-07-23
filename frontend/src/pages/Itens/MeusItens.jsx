import { useEffect, useState } from 'react';
import { Plus, Package, Archive, Trash, SquarePen, CircleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalConfirmacao from '../../components/ModalConfirmacao';

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

  const [itemASerExcluido, setItemASerExcluido] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  async function handleDelete(id) {
  try {
    const res = await fetch(`http://localhost:3000/itens/${id}`, {
      method: 'DELETE',
      credentials: 'include', // se precisar de cookie/token
    });

    if (!res.ok) {
      throw new Error('Erro ao deletar o item');
    }

    const data = await res.json();
    toast.success(data.message || 'ITem excluído com sucesso');

    // Atualiza a lista local, removendo o item deletado
    setItens((prevItens) => prevItens.filter(item => item.id_item !== id));
    setModalVisivel(false);
    setItemASerExcluido(null);

    // Atualize a lista local, ex: removendo o item deletado do state
  } catch (error) {
    toast.error(error.message || 'Erro ao deletar item');
    }
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center py-10 px-40 md:px-30'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-[#B06d6d]">Meus Itens</h1>
        <p>Gerencie seus itens</p>
      </div>
      <Link to="/cadastro-item" className="flex flex-row gap-1 bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all justify-center items-center">
            <Plus size={15}/> Novo Item
      </Link>
    </div>
        {itens.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-10 pb-10 mt-10 gap-1 text-center text-gray-500">
          <Package size={64} className="mb-4 stroke-[#8D8D8D]" />
          <p className="text-lg font-medium text-[#1E1E1E]">Nenhum item cadastrado ainda</p>
          <p className="text-sm text-[#4E4E4E] mb-4">Comece registrando seu primeiro item para trocas</p>
          <Link to="/cadastro-item" className="inline-flex items-center gap-2 px-4 py-2 bg-[#B06D6D] text-white text-sm rounded-lg hover:bg-[#c27a7a] transition-all">
            <Plus size={16} /> Cadastre seu Primeiro Item
          </Link>
       </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 pb-10">
          {itens.map((item) => (
            <li key={item.id_item} className="bg-white p-4 shadow-md rounded-xl border">
            <img src={item.imagem} alt={item.nome} className="w-full h-40 object-cover rounded-md mb-2" />
            <div className='flex flex-row justify-between items-center'>
              <h2 className="text-lg font-semibold">{item.nome}</h2>
              <p className="bg-[#F3F4F6] text-xs text-gray-500 mt-1 px-2 py-1 rounded-2xl items-center justify-center">{item.categoria}</p>
            </div>
            <p className="text-sm text-gray-600">{item.descricao}</p>
        
            <p className="text-xs text-gray-500">{item.status_item ? 'Disponível' : 'Indisponível'}</p>

          <div className="flex flex-row gap-2 mt-3 justify-between items-center">
            <Link to={`/editar-item/${item.id_item}`} className="w-full flex justify-center items-center gap-1 bg-[#F3F4F6] text-[#374151] text-sm py-1 px-2 rounded-sm hover:bg-[#e4e9f3]">
              <SquarePen size={14} /> Editar
            </Link>
            <button 
            onClick={() => {
              setItemASerExcluido(item.id_item);
              setModalVisivel(true);
            }} 
            className="w-full flex justify-center items-center gap-1 bg-[#FEE2E2] text-[#B91C1C] text-sm py-1 px-2 rounded-sm hover:bg-[#f1cdcd] cursor-pointer">
            <Trash size={14} /> Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
)}

  <ModalConfirmacao
  visivel={modalVisivel}
  titulo="Deletar Item"
  mensagem="Tem certeza que deseja excluir este item?"
  onCancelar={() => {
    setModalVisivel(false);
    setItemASerExcluido(null);
  }}
  onConfirmar={() => handleDelete(itemASerExcluido)}
  textoBotaoCancelar="Cancelar"
  textoBotaoConfirmar="Sim"
  />
  </div>
  
  );
}
