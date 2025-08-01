import {
  listarPropostas,
  buscarPropostaPorId,
  criarProposta,
  removerProposta,
  atualizarStatusProposta,
  listarPropostasPendentes,
  listarPropostasPorProponente,
  // listarPropostasPorDono,
  listarPropostasPorStatus
} from '../services/proposta.service.js';

export const getPropostas = async (req, res) => {
  try {
    const propostas = await listarPropostas();
    res.status(200).json(propostas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar propostas', message: error.message });
  }
};

export const getPropostaPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const proposta = await buscarPropostaPorId(id);
    if (!proposta) return res.status(404).json({ error: 'Proposta não encontrada' });
    res.status(200).json(proposta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a proposta', message: error.message });
  }
};

export const postProposta = async (req, res) => {
  try {
    const novaProposta = await criarProposta(req.body);
    res.status(201).json(novaProposta);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar a proposta', message: error.message });
  }
};

export const putProposta = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const atualizada = await atualizarProposta(id, req.body);
    res.status(200).json(atualizada);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar a proposta', message: error.message });
  }
};

export const deleteProposta = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await removerProposta(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar proposta', message: error.message });
  }
};

export async function patchStatusProposta(req, res) {
  const id = Number(req.params.id); // <-- Converte string para inteiro, que é o que o prisma espera
  const { status_proposta } = req.body;

  if (!status_proposta) {
    return res.status(400).json({ erro: "Campo 'status_proposta' é obrigatório." });
  }

  try {
    const propostaAtualizada = await atualizarStatusProposta(id, status_proposta);
    res.status(200).json(propostaAtualizada);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}


// Listagem de propostas pendentes

export const getPropostasPendentes = async (req, res) => {
  try {
    const propostas = await listarPropostasPendentes();
    res.status(200).json(propostas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar propostas pendentes', message: error.message });
  }
};

// Listagem de propostas por proponente

export const getPropostasPorProponente = async (req, res) => {
  try {
    const { cpf } = req.usuario; // <- aqui é o certo
    const propostas = await listarPropostasPorProponente(cpf);
    res.status(200).json(propostas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar propostas por proponente', message: error.message });
  }
};

// // Listagem de propostas por dono

// export const getPropostasPorDono = async (req, res) => {
//   try {
//     const { cpf } = req.params;
//     const propostas = await listarPropostasPorDono(cpf);
//     res.status(200).json(propostas);
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao listar propostas por dono', message: error.message });
//   }
// };


import { listarPropostasPorDono } from '../services/proposta.service.js';

export const getPropostasRecebidasPorUsuario = async (req, res) => {
  try {
    const cpf = req.usuario.cpf; // pega o cpf do token JWT já autenticado
    if (!cpf) {
      return res.status(400).json({ mensagem: 'CPF do usuário não encontrado no token' });
    }

    const propostas = await listarPropostasPorDono(cpf);
    res.json(propostas);
  } catch (error) {
    console.error("Erro ao buscar propostas recebidas:", error);
    res.status(500).json({ mensagem: "Erro ao buscar propostas recebidas" });
  }
};


// Listagem de propostas por status

export const getPropostasPorStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const propostas = await listarPropostasPorStatus(status);
    res.status(200).json(propostas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar propostas por status', message: error.message });
  }
};