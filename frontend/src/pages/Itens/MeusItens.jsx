import { useEffect, useState } from 'react';
import { Plus, Package, Archive, Trash, SquarePen, CircleAlert, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalConfirmacao from '../../components/ModalConfirmacao';

export default function MeusItens() {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
  const fetchItens = async () => {
    try {
      const response = await fetch('http://localhost:3000/itens/meus-itens', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar os itens');
      }

      const dados = await response.json();
      setItens(dados);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false); // Finaliza o carregamento
    }
  };

  fetchItens();
  }, []);

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

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;

    const totalPaginas = Math.ceil(itens.length / itensPorPagina);

    const itensPaginados = itens.slice(
      (paginaAtual - 1) * itensPorPagina,
      paginaAtual * itensPorPagina
    );


  const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-lg animate-pulse">
    <div className="bg-gray-300 w-full h-[283px] rounded-t-lg"></div>
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 w-full bg-gray-300 rounded-sm"></div>
        <div className="h-8 w-full bg-gray-300 rounded-sm"></div>
      </div>
    </div>
  </div>
  );

  return (
    <div className='min-h-screen'>
      <div className='flex flex-row justify-between items-center py-10 px-40 md:px-30'>
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold text-[#B06d6d]">Meus Itens</h1>
        <p>Gerencie seus itens</p>
      </div>
      <Link to="/cadastro-item" className="flex flex-row gap-1 bg-[#B06D6D] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c27a7a] transition-all justify-center items-center">
            <Plus size={15}/> Novo Item
      </Link>
    </div>
    {carregando ? (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 pb-10 md:px-30">
        {[...Array(4)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
      </ul>
      ) : itens.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-10 pb-10 mt-10 gap-1 text-center text-gray-500">
          <Package size={64} className="mb-4 stroke-[#8D8D8D]" />
          <p className="text-lg font-medium text-[#1E1E1E]">Nenhum item cadastrado ainda</p>
          <p className="text-sm text-[#4E4E4E] mb-4">Comece registrando seu primeiro item para trocas</p>
          <Link to="/cadastro-item" className="inline-flex items-center gap-2 px-4 py-2 bg-[#B06D6D] text-white text-sm rounded-lg hover:bg-[#c27a7a] transition-all">
            <Plus size={16} /> Cadastre seu Primeiro Item
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 pb-10 md:px-30">
          {itensPaginados.map((item) => (
            <li key={item.id_item} className="bg-white rounded-lg shadow-lg">
              <div>
                <img src={item.imagem} alt={item.nome} className="bg-gray-200 w-full rounded-t-lg object-cover mb-3 h-[283px]" />
              </div>
              <div className="p-4">
                  <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-[#B06D6D] text-sm">{item.nome}</h4>
                    <span className="text-xs text-[#4E4E4E] bg-gray-100 px-2 py-0.5 rounded">{item.categoria || "Categoria"}</span>
                  </div>
                  <p className="text-sm text-[#1E1E1E] mb-3">{item.descricao}</p>
                </div>

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
            </div>
            </li>
          ))}
        </ul>
      )}
      {/* Paginação */}
      {!carregando && totalPaginas > 1 && (
        <div className="flex justify-center items-center mt-5 mb-10 gap-4">
          <button
            onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaAtual === 1}
            className="px-4 py-2 disabled:opacity-50 cursor-pointer"
          >
            <CircleChevronLeft className="text-[#4E4E4E] "/>
          </button>

          <span className="text-xs text-[#4E4E4E]">
            Página {paginaAtual} de {totalPaginas}
          </span>

          <button
            onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
            className="px-4 py-2 disabled:opacity-50 cursor-pointer"
          >
            <CircleChevronRight className="text-[#4E4E4E] " />
          </button>
        </div>
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
