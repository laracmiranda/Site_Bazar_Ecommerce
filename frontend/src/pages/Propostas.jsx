// src/pages/Propostas.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Propostas() {
  const { usuario } = useAuth();
  const [propostas, setPropostas] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (usuario?.cpf) {
      carregarPropostas();
    }
  }, [usuario]);

  async function carregarPropostas() {
    try {
      const { data } = await api.get(`/propostas/recebidas/${usuario.cpf}`);
      setPropostas(data);
    } catch (err) {
      setErro('Erro ao carregar propostas.');
    }
  }

  async function atualizarStatus(id, novoStatus) {
    try {
      await api.patch(`/propostas/${id}`, { status: novoStatus });
      carregarPropostas(); // Recarrega após atualizar
    } catch (err) {
      alert('Erro ao atualizar proposta.');
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Propostas Recebidas</h2>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {propostas.length === 0 ? (
        <p>Nenhuma proposta recebida até o momento.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {propostas.map((prop) => (
            <li key={prop.id_proposta} className="border rounded p-4 shadow bg-white">
              <div className="mb-2">
                <strong>Item Recebido:</strong> {prop.item_recebido.nome}
              </div>
              <div className="mb-2">
                <strong>Item Ofertado:</strong> {prop.item_ofertado.nome}
              </div>
              <div className="mb-2">
                <strong>Proponente:</strong> {prop.proponente.nome}
              </div>
              <div className="mb-2">
                <strong>Status:</strong>{' '}
                <span
                  className={
                    prop.status === 'aceita'
                      ? 'text-green-600'
                      : prop.status === 'recusada'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }
                >
                  {prop.status}
                </span>
              </div>

              {prop.status === 'pendente' && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => atualizarStatus(prop.id_proposta, 'aceita')}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => atualizarStatus(prop.id_proposta, 'recusada')}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Recusar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
