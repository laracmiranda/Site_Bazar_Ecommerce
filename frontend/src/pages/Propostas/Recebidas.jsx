"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CardRecebidas from "../../components/CardRecebidas";
import { useAuth } from "../../context/AuthContext";

export default function Recebidas() {
  const { usuario } = useAuth(); // pega o usuário logado do contexto
  const [propostasRecebidas, setPropostasRecebidas] = useState([]);

  useEffect(() => {

      const buscarPropostasRecebidas = async () => {
    try {
      const res = await axios.get('http://localhost:3000/propostas/recebidas/minhas', {
        withCredentials: true,
      });

      console.log("Propostas completas:", res.data);
      
      setPropostasRecebidas(res.data);

    } catch (error) {
      console.error("Erro ao buscar propostas recebidas:", error);
    }
  };

    buscarPropostasRecebidas();
  }, []);

  const atualizarStatus = async (id, status) => {
  try {
    const res = await axios.patch(`http://localhost:3000/propostas/${id}/status`, {
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

  } catch (error) {
    console.error("Erro ao atualizar status da proposta:", error);
  }
};


  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Propostas Recebidas</h1>
      <p className="text-sm text-gray-500 mb-4">
        Gerencie as trocas propostas por outros usuários
      </p>

      {propostasRecebidas.length === 0 ? (
        <p className="text-gray-500">Nenhuma proposta recebida até o momento.</p>
      ) : (
        propostasRecebidas.map((p) => (
          <CardRecebidas
            key={p.id_proposta}
            status_proposta={p.status_proposta}
            itemDesejado={p.itemDesejado}
            itemOfertado={p.itemOfertado}
            onAceitar={() => atualizarStatus(p.id_proposta, 'aceita')}
            onRecusar={() => atualizarStatus(p.id_proposta, 'rejeitada')}
          />
        ))
      )}
    </div>
  );
}
