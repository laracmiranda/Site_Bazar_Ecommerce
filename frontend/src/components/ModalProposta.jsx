import { useState } from 'react';
import { CircleAlert } from 'lucide-react';

export default function ModalProposta({
  visivel,
  onCancelar,
  onConfirmar,
  itensDisponiveis,
  itemDesejadoId,
  donoItemCpf,
}) {
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;

  if (!visivel) return null;

  const handleConfirmar = () => {
    if (itemSelecionado) {
      onConfirmar({
        item_ofertado: itemSelecionado,
        item_desejado: itemDesejadoId,
        cpf_dono_item: donoItemCpf,
      });
    }
  };

  const totalPaginas = Math.ceil(itensDisponiveis.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const itensPaginados = itensDisponiveis.slice(inicio, fim);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center flex flex-col gap-2 items-center">
        <CircleAlert size={60} className="mb-2" style={{ stroke: '#B06D6D' }} />
        <p className="text-lg font-semibold text-[#B06D6D]">Fazer Proposta</p>
        <p className="text-sm text-gray-600 mb-2">Escolha um dos seus itens para oferecer em troca:</p>

        <div className="flex flex-col w-full gap-2">
         {itensPaginados.map((item) => (
              <button
                key={item.id_item}
                onClick={() => setItemSelecionado(item.id_item)}
                className={`p-3 rounded border text-sm text-left transition ${
                  itemSelecionado === item.id_item
                    ? 'bg-[#FEE2E2] border-[#B91C1C] text-[#B91C1C]'
                    : 'bg-white border-gray-300 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.imagem || "https://via.placeholder.com/40"}
                    alt={item.nome}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.nome}</p>
                    <p className="text-xs text-gray-600">{item.categoria}</p>
                  </div>
                </div>
              </button>
          ))}
        </div>

        {totalPaginas > 1 && (
          <div className="flex gap-2 justify-center mt-2">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
              disabled={paginaAtual === 1}
              className="text-sm text-gray-600 px-2 py-1 border rounded disabled:opacity-40"
            >
              ←
            </button>
            <span className="text-sm text-gray-700 px-2">{paginaAtual}/{totalPaginas}</span>
            <button
              onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className="text-sm text-gray-600 px-2 py-1 border rounded disabled:opacity-40"
            >
              →
            </button>
          </div>
        )}

        <div className="flex justify-center w-full gap-4 mt-6">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-[#4E4E4E] rounded border border-[#8D8D8D] hover:bg-gray-200 transition w-full"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={!itemSelecionado}
            className="px-4 py-2 bg-[#FEE2E2] text-[#B91C1C] rounded hover:bg-[#E2B9B9] transition w-full disabled:opacity-50"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
