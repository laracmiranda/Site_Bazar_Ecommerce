// src/components/ModalConfirmacao.jsx

import { CircleAlert } from 'lucide-react';

export default function ModalConfirmacao({
  visivel,
  titulo = 'Tem certeza?',
  mensagem = 'Você tem certeza que deseja prosseguir com essa ação?',
  onCancelar,
  onConfirmar,
  textoBotaoCancelar = 'Cancelar',
  textoBotaoConfirmar = 'Confirmar',
  Icone = CircleAlert,
  corIcone = '#B06D6D',
}) {
  if (!visivel) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center flex flex-col gap-2 items-center">
        {Icone && <Icone size={60} className="mb-2" style={{ stroke: corIcone }} />}
        <p className="text-lg font-semibold text-[#B06D6D]">{titulo}</p>
        <p className="text-sm text-gray-600 mb-6">{mensagem}</p>

        <div className="flex justify-center w-full gap-4">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-[#4E4E4E] rounded border border-[#8D8D8D] hover:bg-gray-200 transition w-full"
          >
            {textoBotaoCancelar}
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 bg-[#FEE2E2] text-[#B91C1C] rounded hover:bg-[#E2B9B9] transition w-full"
          >
            {textoBotaoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

