  "use client"

  import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"

 // Ajuste para consistência com o backend se 'recusada' for equivalente a 'rejeitada'
const getStatusBadge = (status) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"

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

const getStatusIcon = (status) => {
  switch (status) {
    case "pendente":
      return <Clock className="w-4 h-4 text-yellow-600" />
    case "aceita":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "rejeitada": // <-- Mudei de 'recusada' para 'rejeitada'
      return <XCircle className="w-4 h-4 text-red-600" />
    case "cancelada":
      return <XCircle className="w-4 h-4 text-gray-500" />
    default:
      return null
  }
}

const getStatusMessage = (status) => {
  switch (status) {
    case "aceita":
      return <p className="text-green-600 font-medium text-center">Esta proposta foi aceita.</p>
    case "rejeitada": // <-- Mudei de 'recusada' para 'rejeitada'
      return <p className="text-red-600 font-medium text-center">Esta proposta foi rejeitada.</p>
    case "cancelada":
      return <p className="text-gray-600 font-medium text-center">Esta proposta foi cancelada.</p>
    default:
      return null
  }
}

export default function PropostasFeitas({
  propostas = [], // Garante que propostas é um array, mesmo se vier null do pai
  loading = false,
  onCancelarProposta,
  onEditarProposta,
}) {
  const handleCancelarProposta = (id) => {
    if (onCancelarProposta) onCancelarProposta(id)
  }

  
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Propostas Feitas</h1>
          <p className="text-gray-600">Acompanhe o status das suas propostas de troca</p>
        </div>

        <div className="space-y-6">
          {propostas.map((proposta) => (
            <div key={proposta.id_proposta} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex flex-row items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(proposta.status_proposta)}
                  <h3 className="text-lg font-semibold text-gray-900">Proposta de Troca</h3>
                </div>
                {getStatusBadge(proposta.status_proposta)}
              </div>

              <div className="px-6 pb-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Item Desejado */}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">Item Desejado:</h4>
                    <img
                      src={proposta.itemDesejado?.imagem}
                      alt={proposta.itemDesejado?.nome}
                      className="w-17 h-17 object-cover rounded-md mb-2"
                    />
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">{proposta.itemDesejado?.nome}</p>
                      <p className="text-gray-600">{proposta.itemDesejado?.categoria}</p>
                    </div>
                  </div>

                  {/* Item Ofertado */}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">Item Ofertado:</h4>
                    <img
                      src={proposta.itemOfertado?.imagem}
                      alt={proposta.itemOfertado?.nome}
                      className="w-17 h-17 object-cover rounded-md mb-2 mx-auto"
                    />
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-800">{proposta.itemOfertado?.nome}</p>
                      <p className="text-gray-600">{proposta.itemOfertado?.categoria}</p>
                    </div>
                  </div>
                </div>

                {/* Linha divisória */}
                <hr className="my-6 border-gray-200" />

                {/* Ações */}
                {proposta.status_proposta === "pendente" ? (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-md border border-red-200 text-red-700 bg-transparent hover:bg-red-50"
                      onClick={() => handleCancelarProposta(proposta.id_proposta)}
                    >
                      Cancelar Proposta
                    </button>

                    <button
                      className="px-4 py-2 text-sm font-medium rounded-md border border-blue-200 text-blue-700 bg-transparent hover:bg-blue-50"
                      onClick={() => handleEditarProposta(proposta.id_proposta)}
                    >
                      Editar Proposta
                    </button>
                  </div>
                ) : (
                  getStatusMessage(proposta.status_proposta)
                )}

                {/* Dono e Proponente */}
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>
                    Para: <strong>{proposta.DonoItem?.nome}</strong> — Proposto por:{" "}
                    <strong>{proposta.proponente?.nome}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {propostas.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma proposta feita</h3>
            <p className="text-gray-600">Você ainda não fez nenhuma proposta de troca.</p>
          </div>
        )}
      </div>
    )
  }
