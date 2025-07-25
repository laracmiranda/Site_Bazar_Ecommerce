import React from 'react';

export default function CardRecebidas({ status_proposta, itemDesejado, itemOfertado, onAceitar, onRecusar }) {
  const renderStatusTexto = () => {
    if (status_proposta === 'pendente') return 'Pendente';
    if (status_proposta === 'aceita') return 'Aceita';
    if (status_proposta === 'rejeitada') return 'Recusada';
    return status_proposta;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Proposta de Troca</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status_proposta === 'pendente'
              ? 'bg-yellow-100 text-yellow-800'
              : status_proposta === 'aceita'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {renderStatusTexto()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Seu Item Desejado:</h3>
          <p className="font-semibold text-gray-800">{itemDesejado.nome}</p>
          <p className="text-sm text-gray-500">{itemDesejado.categoria}</p>
          <p className="text-sm text-gray-600 italic">{itemDesejado.descricao}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Item Ofertado:</h3>
          <p className="font-semibold text-gray-800">{itemOfertado.nome}</p>
          <p className="text-sm text-gray-500">{itemOfertado.categoria}</p>
          <p className="text-sm text-gray-600 italic">{itemOfertado.descricao}</p>
        </div>
      </div>

      {status_proposta === 'pendente' && (
        <div className="flex justify-end space-x-3">
          <button
            onClick={onRecusar}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Recusar
          </button>
          <button
            onClick={onAceitar}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Aceitar
          </button>
        </div>
      )}

      {status_proposta === 'aceita' && (
        <p className="text-center text-green-600 font-medium">Esta proposta foi aceita.</p>
      )}

      {status_proposta === 'rejeitada' && (
        <p className="text-center text-red-600 font-medium">Esta proposta foi recusada.</p>
      )}
    </div>
  );
}
