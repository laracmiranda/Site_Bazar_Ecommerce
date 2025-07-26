  "use client"

import { CircleChevronLeft, CircleChevronRight, FileText, Ghost, Plus, X } from "lucide-react"
import ModalConfirmacao from "./ModalConfirmacao"
import React, { useState } from "react"
import CardSkeleton from "./CardSkeleton"
import { Link } from "react-router-dom"

 // Ajuste para consistência com o backend se 'recusada' for equivalente a 'rejeitada'
const getStatusBadge = (status) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium"

  switch (status) {
    case "pendente":
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pendente</span>
    case "aceita":
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Aceita</span>
    case "rejeitada": // <-- Mudei de 'recusada' para 'rejeitada' para consistência
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejeitada</span>
    case "cancelada":
      return <span className={`${baseClasses} bg-gray-200 text-gray-700`}>Cancelada</span>
    default:
      return null
  }
}

const getBorderColorByStatus = (status) => {
  switch (status) {
    case "pendente":
      return "border-yellow-400"
    case "aceita":
      return "border-green-500"
    case "rejeitada":
      return "border-red-500"
    case "cancelada":
      return "border-gray-400"
    default:
      return "border-gray-200"
  }
}

const getStatusMessage = (status) => {
  switch (status) {
    case "aceita":
      return <p className="text-green-600 font-medium text-center">Esta proposta foi aceita</p>
    case "rejeitada": // <-- Mudei de 'recusada' para 'rejeitada'
      return <p className="text-red-600 font-medium text-center">Esta proposta foi rejeitada</p>
    case "cancelada":
      return <p className="text-gray-600 font-medium text-center">Esta proposta foi cancelada</p>
    default:
      return null
  }
}

export default function PropostasFeitas({
  propostas = [], // Garante que propostas é um array, mesmo se vier null do pai
  loading = false,
  onCancelarProposta,
}) {

  const [modalVisivel, setModalVisivel] = useState(false)
  const [propostaSelecionada, setPropostaSelecionada] = useState(null)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  const abrirModalCancelar = (propostaId) => {
    setPropostaSelecionada(propostaId)
    setModalVisivel(true)
  }

  const confirmarCancelamento = () => {
    if (propostaSelecionada) {
      onCancelarProposta(propostaSelecionada)
      setModalVisivel(false)
      setPropostaSelecionada(null)
    }
  }

  const cancelarModal = () => {
    setModalVisivel(false)
    setPropostaSelecionada(null)
  }

  const handleCancelarProposta = (id) => {
    if (onCancelarProposta) onCancelarProposta(id)
  }

  // Paginação
  const indiceInicial = (paginaAtual - 1) * itensPorPagina
  const indiceFinal = indiceInicial + itensPorPagina
  const propostasPaginadas = propostas.slice(indiceInicial, indiceFinal)
  const totalPaginas = Math.ceil(propostas.length / itensPorPagina)
  
    return (
      <div className="max-w-4xl mx-auto mb-10 px-4">
        <div className="space-y-6">
          {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
          ) : (
          propostasPaginadas.map((proposta) => (
            <div key={proposta.id_proposta} className={`bg-white border rounded-lg shadow-md ${getBorderColorByStatus(proposta.status_proposta)}`}>
              <div className="flex flex-row items-center justify-between p-6 pb-4">
                <div className='flex flex-col'>
                  <h2 className="text-lg font-semibold text-[#4E4E4E]">Proposta de Troca</h2>
                    {/* Dono e Proponente */}
                  <div className="text-sm text-[#4E4E4E]">
                    <p>
                      Para: <strong>{proposta.DonoItem?.nome}</strong> — Proposto por:{" "}
                      <strong>{proposta.proponente?.nome}</strong>
                    </p>
                  </div>

                </div>
                {getStatusBadge(proposta.status_proposta)}
              </div>

              <div className="px-6 pb-6">
                <div className="flex flex-col lg:flex-row justify-between w-full gap-5">
                  <div className='flex flex-col flex-1 bg-[#F9FAFB] py-2 px-3 rounded-sm mb-4 lg:mb-0'>
                    <h3 className="text-sm font-medium text-[#4E4E4E] mb-3">Seu Item Desejado:</h3>
                      <div className='flex justify-baseline gap-3'>
                        <img
                          src={proposta.itemDesejado?.imagem}
                          alt={proposta.itemDesejado?.nome}
                          className="w-16 h-16 object-cover rounded-md mb-2"
                        />
                        <div className='flex flex-col'>
                          <p className="font-semibold mb-1 text-[#B06D6D]">{proposta.itemDesejado?.nome}</p>
                          <p className="text-sm text-[#4E4E4E]">{proposta.itemDesejado?.categoria}</p>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col flex-1 bg-white py-2 px-3 rounded-sm'>
                    <h3 className="text-sm font-medium text-[#4E4E4E] mb-3">Item Ofertado:</h3>
                    <div className='flex justify-baseline gap-3'>
                      <img
                        src={proposta.itemOfertado?.imagem}
                        alt={proposta.itemOfertado?.nome}
                        className="w-16 h-16 object-cover rounded-md mb-2"
                      />
                      <div className='flex flex-col'>
                          <p className="font-semibold mb-1 text-[#B06D6D]">{proposta.itemOfertado?.nome}</p>
                          <p className="text-sm text-[#4E4E4E]">{proposta.itemOfertado?.categoria}</p>
                      </div>
                  </div>
                </div>
              </div>

                {/* Linha divisória */}
                <hr className="my-6 border-gray-200" />

                {/* Ações */}
                {proposta.status_proposta === "pendente" ? (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      className="flex gap-2 items-center justify-center px-4 py-2 bg-[#D62626] text-white rounded-md hover:bg-[#e75b5b] focus:outline-none focus:ring-2 focus:ring-[#D62626] focus:ring-offset-2"
                      onClick={() => abrirModalCancelar(proposta.id_proposta)}
                    >
                      <X size={16}/>
                      Cancelar Proposta
                    </button>
                  </div>
                ) : (
                  getStatusMessage(proposta.status_proposta)
                )}

              </div>
            </div>
            ))
          )}
        </div>

        {!loading && propostas.length === 0 && (
          <div className="flex flex-col items-center justify-center px-10 pb-10 mt-10 gap-1 text-center text-gray-500">
            <Ghost size={64} className="mb-4 stroke-[#8D8D8D]" />
            <p className="text-lg font-medium text-[#1E1E1E]">Nenhuma proposta enviada ainda</p>
            <p className="text-sm text-[#4E4E4E] mb-4">Registre um item legal!</p>
            <Link to="/cadastro-item" className="inline-flex items-center gap-2 px-4 py-2 bg-[#B06D6D] text-white text-sm rounded-lg hover:bg-[#c27a7a] transition-all">
              <Plus size={16} /> Adicionar Item
            </Link>
      </div>
        )}

        {!loading && totalPaginas > 1 && (
          <div className="flex justify-center items-center mt-5 mb-10 gap-4">
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
              className="px-4 py-2 disabled:opacity-50"
            >
              <CircleChevronLeft className="text-[#4E4E4E]" />
            </button>

            <span className="text-xs text-[#4E4E4E]">
              Página {paginaAtual} de {totalPaginas}
            </span>

            <button
              onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className="px-4 py-2 disabled:opacity-50"
            >
              <CircleChevronRight className="text-[#4E4E4E]" />
            </button>
          </div>
        )}


        <ModalConfirmacao
          visivel={modalVisivel}
          titulo="Cancelar Proposta"
          mensagem="Tem certeza que deseja cancelar esta proposta?"
          onCancelar={cancelarModal}
          onConfirmar={confirmarCancelamento}
          textoBotaoCancelar="Voltar"
          textoBotaoConfirmar="Cancelar"
        />
      </div>
    )
  }