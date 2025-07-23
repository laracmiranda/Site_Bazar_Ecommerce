// src/pages/MeusItens.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PackagePlus, Package } from 'lucide-react';

export default function MeusItens() {
  const { usuario } = useAuth();
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario?.email) {
      buscarItensDoUsuario();
    }
  }, [usuario]);

  async function buscarItensDoUsuario() {
    try {
      const { data } = await api.get(`/itens/dono/${usuario.cpf}`);
      setItens(data);
    } catch (err) {
      setErro('Erro ao carregar itens.');
    }
  }

  async function deletarItem(id) {
    try {
      await api.delete(`/itens/${id}`);
      setItens((prev) => prev.filter((item) => item.id_item !== id));
    } catch (err) {
      alert('Erro ao excluir item.');
    }
  }

  return (
    <div className="bg-[#f4f4f4] min-h-screen px-4 py-10">
      <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-[#B06D6D]">Meus itens</h2>
          <p className="text-gray-600 text-sm">Gerencie seus itens</p>
        </div>
        <button
          onClick={() => navigate('/cadastro-item')}
          className="bg-[#B06D6D] text-white px-4 py-2 rounded hover:bg-[#c27a7a] transition text-sm"
        >
          + Novo Item
        </button>
      </div>

      {erro && <p className="text-red-500 text-center">{erro}</p>}

      {itens.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 gap-6">
          <Package size={64} className="text-gray-400" />
          <div>
            <h3 className="text-lg font-semibold">Nenhum item registrado ainda</h3>
            <p className="text-sm text-gray-600">Comece registrando seu primeiro item para trocas</p>
          </div>
          <button
            onClick={() => navigate('/cadastro-item')}
            className="flex items-center gap-2 bg-[#B06D6D] text-white px-4 py-2 rounded hover:bg-[#c27a7a] transition"
          >
            <PackagePlus size={16} />
            Registre seu Primeiro Item
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
          {itens.map((item) => (
            <li key={item.id_item} className="border rounded p-4 shadow bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.nome}</h3>
                  <p className="text-sm text-gray-500">{item.categoria}</p>
                  <p className={`text-sm ${item.status_item ? 'text-green-600' : 'text-red-500'}`}>
                    {item.status_item ? 'Disponível' : 'Indisponível'}
                  </p>
                </div>
                <button
                  onClick={() => deletarItem(item.id_item)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
              {item.imagem && (
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
