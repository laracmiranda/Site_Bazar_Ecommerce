"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import PropostasFeitas from "../../components/CardFeitas"
import { toast } from "react-toastify"

export default function PropostasPage() {
  const [propostas, setPropostas] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
  const fetchPropostas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/propostas/proponente/minhas-propostas", {
        withCredentials: true,
      })
      console.log("Resposta da API:", response.data)

      const propostasOrdenadas = response.data.sort((a, b) => b.id_proposta - a.id_proposta);
      setPropostas(propostasOrdenadas);

      setLoading(false)
    } catch (error) {
      console.error("Erro ao buscar propostas:", error)
    }
  }

  fetchPropostas()
}, [])


 const handleCancelarProposta = async (propostaId) => {
  const proposta = propostas.find((p) => p.id_proposta === propostaId)

  if (!proposta) {
    toast.error("Proposta não encontrada.")
    return
  }

  if (proposta.status_proposta !== "pendente") {
    toast.warning("Apenas propostas pendentes podem ser canceladas.")
    return
  }

  try {
    await axios.patch(
      `http://localhost:3000/propostas/${propostaId}/status`,
      { status_proposta: "cancelada" },
      { withCredentials: true }
    )

    setPropostas((prev) =>
      prev.map((p) =>
        p.id_proposta === propostaId ? { ...p, status_proposta: "cancelada" } : p
      )
    )

    toast.success("Proposta cancelada com sucesso!")
  } catch (error) {
    console.error("Erro ao cancelar proposta:", error)
    toast.error("Erro ao cancelar proposta. Tente novamente.")
  }
}
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar propostas</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 md:px-30 py-10 flex-1 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[#B06d6d]">Propostas Realizadas</h1>
        <p>Acompanhe o status das suas propostas de troca</p>
      </div>
        <PropostasFeitas
          propostas={propostas}
          loading={loading}
          onCancelarProposta={handleCancelarProposta}      
        />
    </div>
  )
}