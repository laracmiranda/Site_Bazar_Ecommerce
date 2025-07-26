import { Check, X } from 'lucide-react';
import React from 'react';

export default function CardRecebidas({ status_proposta, itemDesejado, itemOfertado, onAceitar, onRecusar, proponente }) {
  const renderStatusTexto = () => {
    if (status_proposta === 'pendente') return 'Pendente';
    if (status_proposta === 'aceita') return 'Aceita';
    if (status_proposta === 'rejeitada') return 'Recusada';
    if (status_proposta === 'cancelada') return 'Cancelada';
    return status_proposta;
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border ${
      status_proposta === 'pendente' ? 'border-yellow-200' :
      status_proposta === 'aceita' ? 'border-[#16A34A]' :
      status_proposta === 'rejeitada' ? 'border-[#D62626]' :
      'border-gray-400' }`}>

      <div className="flex justify-between items-start mb-4">
        <div className='flex flex-col'>
          <h2 className="text-lg font-semibold text-[#4E4E4E]">Proposta de Troca</h2>
          <div className="text-sm text-[#4E4E4E]">
            <p>Proposto por: <strong>{proponente?.nome}</strong></p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status_proposta === 'pendente'
              ? 'bg-yellow-100 text-yellow-800'
              : status_proposta === 'aceita'
              ? 'bg-green-100 text-green-800'
              : status_proposta === 'rejeitada'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          {renderStatusTexto()}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-5">
        <div className='flex flex-col flex-1 bg-[#F9FAFB] py-2 px-3 rounded-sm mb-4 lg:mb-0'>
          <h3 className="text-sm font-medium text-[#4E4E4E] mb-3">Seu Item Desejado:</h3>
          <div className='flex justify-baseline gap-3'>
            <img
              src={itemDesejado?.imagem}
              alt={itemDesejado?.nome}
              className="w-20 h-20 object-cover rounded-md mb-2"
            /> 
            <div className='flex flex-col'>
              <p className="font-semibold mb-1 text-[#B06D6D]">{itemDesejado.nome}</p>
              <p className="text-sm text-[#4E4E4E]">{itemDesejado.categoria}</p>
              <p className="text-sm text-[#4E4E4E] italic">{itemDesejado.descricao}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 bg-white py-2 px-3 rounded-sm'>
          <h3 className="text-sm font-medium text-[#4E4E4E] mb-3">Item Ofertado:</h3>
          <div className='flex justify-baseline gap-3'>
            <img
              src={itemOfertado?.imagem}
              alt={itemOfertado?.nome}
              className="w-20 h-20 object-cover rounded-md mb-2"
            /> 
            <div className='flex flex-col'>
              <p className="font-semibold mb-1 text-[#B06D6D]">{itemOfertado.nome}</p>
              <p className="text-sm text-[#4E4E4E]">{itemOfertado.categoria}</p>
              <p className="text-sm text-[#4E4E4E] italic">{itemOfertado.descricao}</p>
            </div>
            </div>
          </div>
      </div>

      {/* Linha divisória */}
      <hr className="my-6 border-gray-200" />

      {status_proposta === 'pendente' && (
        <div className="flex flex-col md:flex-row justify-between w-full gap-2">
          <button
            onClick={onAceitar}
            className="flex gap-2 items-center justify-center px-4 py-2 w-full bg-[#16A34A] text-white rounded-md hover:bg-[#44c272] focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2"
          >
            <Check size={16}/> Aceitar
          </button>
          <button
            onClick={onRecusar}
            className="flex gap-2 items-center justify-center px-4 py-2 w-full bg-[#D62626] text-white rounded-md hover:bg-[#e75b5b] focus:outline-none focus:ring-2 focus:ring-[#D62626] focus:ring-offset-2"
          >
            <X size={16}/> Recusar
          </button>
        </div>
      )}

      {status_proposta === 'aceita' && (
        <p className="text-center text-[#16A34A] font-medium">Esta proposta foi aceita</p>
      )}

      {status_proposta === 'rejeitada' && (
        <p className="text-center text-[#D62626] font-medium">Esta proposta foi recusada</p>
      )}
    </div>
  );
}