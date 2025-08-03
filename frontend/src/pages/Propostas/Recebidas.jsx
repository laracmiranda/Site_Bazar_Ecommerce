"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CardRecebidas from "../../components/CardRecebidas";
import { useAuth } from "../../context/AuthContext"; 
import ModalConfirmacao from "../../components/ModalConfirmacao";
import { toast } from "react-toastify";
import CardSkeleton from "../../components/CardSkeleton"; 
import { CircleChevronLeft, CircleChevronRight, Ghost, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Recebidas() {
  const { usuario } = useAuth(); // pega o usuário logado do contexto
  const [propostasRecebidas, setPropostasRecebidas] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [idPropostaParaRecusar, setIdPropostaParaRecusar] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const propostasPaginadas = propostasRecebidas.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(propostasRecebidas.length / itensPorPagina);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
      const buscarPropostasRecebidas = async () => {
    try {
      const res = await axios.get(`${API_URL}/propostas/recebidas/minhas`, {
        withCredentials: true,
      });

      console.log("Propostas completas:", res.data);


      const propostasOrdenadas = res.data.sort((a, b) => b.id_proposta - a.id_proposta);
      setPropostasRecebidas(propostasOrdenadas);


    } catch (error) {
      console.error("Erro ao buscar propostas recebidas:", error);
    } finally {
      setCarregando(false);
    }
  };

    buscarPropostasRecebidas();
  }, []);

  const atualizarStatus = async (id, status) => {
  try {
    const res = await axios.patch(`${API_URL}/propostas/${id}/status`, {
      status_proposta: status
    }, {
      withCredentials: true,
    });

    console.log(`Proposta ${id} atualizada para: ${status}`);

    // Atualiza localmente o status da proposta
    setPropostasRecebidas((prev) =>
      prev.map((p) =>
        p.id_proposta === id ? { ...p, status_proposta: status } : p
      )
    );

    if (status === 'aceita') {
      toast.success("Proposta aceita com sucesso!");
    } else if (status === 'rejeitada') {
      toast.info("Proposta recusada com sucesso!");
    }

  } catch (error) {
    console.error("Erro ao atualizar status da proposta:", error);
    toast.error("Erro ao atualizar proposta. Tente novamente.");
  }
};

  const abrirModalRecusar = (id) => {
  setIdPropostaParaRecusar(id);
  setModalVisivel(true);
};

  const confirmarRecusa = async () => {
    if (!idPropostaParaRecusar) return;

    await atualizarStatus(idPropostaParaRecusar, "rejeitada");
    setModalVisivel(false);
    setIdPropostaParaRecusar(null);
};



  return ( 
    <>
    <div className="min-h-screen">
      <div className="px-4 md:px-30 py-10 flex-1 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[#B06d6d]">Propostas Recebidas</h1>
        <p>Gerencie as trocas propostas feitas por outros usuários</p>
      </div>

      <div className="max-w-4xl mx-auto mb-10 px-4 space-y-6">
      {carregando ? (
      <>
        <CardSkeleton />
        <CardSkeleton />
      </>
      ) : propostasPaginadas.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-10 pb-10 mt-10 gap-1 text-center text-gray-500">
            <Ghost size={64} className="mb-4 stroke-[#8D8D8D]" />
            <p className="text-lg font-medium text-[#1E1E1E]">Você ainda não recebeu propostas :( </p>
            <p className="text-sm text-[#4E4E4E] mb-4">Registre um item legal!</p>
            <Link to="/cadastro-item" className="inline-flex items-center gap-2 px-4 py-2 bg-[#B06D6D] text-white text-sm rounded-lg hover:bg-[#c27a7a] transition-all">
              <Plus size={16} /> Adicionar Item
            </Link>
        </div>
      ) : (
        propostasPaginadas.map((p) => (
          <CardRecebidas
            key={p.id_proposta}
            status_proposta={p.status_proposta}
            itemDesejado={p.itemDesejado}
            itemOfertado={p.itemOfertado}
            onAceitar={() => atualizarStatus(p.id_proposta, 'aceita')}
            onRecusar={() => abrirModalRecusar(p.id_proposta, 'rejeitada')}
            proponente={p.proponente}
          />
        ))
      )}
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


    </div>
    </div>

    <ModalConfirmacao
    visivel={modalVisivel}
    titulo="Recusar proposta"
    mensagem="Tem certeza que deseja recusar esta proposta?"
    onCancelar={() => setModalVisivel(false)}
    onConfirmar={confirmarRecusa}
    textoBotaoCancelar="Cancelar"
    textoBotaoConfirmar="Recusar"
    />


    </>
  );
}