import {
  listarPropostas,
  buscarPropostaPorId,
  criarProposta,
  atualizarProposta,
  removerProposta
} from '../services/proposta.service.js';

export const getPropostas = async (req, res) => {
  try {
    const propostas = await listarPropostas();
    res.status(200).json(propostas)
  } catch (error){
    res.status(500).json({erro: 'Erro ao listar propostas', mensagem: error.message});    
  }
};

export const getPropostaPorId = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const proposta = await buscarPropostaPorId(id);

    if(!proposta) return res.status(404).json({erro: 'Proposta não encontrada'});
    res.status(200).json(proposta);
  } catch(error){
    res.status(500).json({erro: 'Erro ao buscar a proposta', mensagem: error.message});
  }
};

export const postProposta = async (req, res) =>{
  try{
    const novaProposta = await criarProposta(req.body);
    res.status(201).json(novaProposta);
  } catch(error){
    res.status(400).json({erro: 'Erro ao cadastrar a proposta', mensagem: error.message});
  }
};

export const putProposta = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const atualizada = await atualizarProposta(id, req.body);
    res.status(200).json(atualizada)
  }  catch(error){
    res.status(400).json({erro: 'Erro ao atualizar a proposta', mensagem: error.message});
  }
};

export const deleteProposta = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    await removerProposta(id);
    res.status(204).send();
  }  catch(error){
    res.status(400).json({erro: 'Erro ao deletar proposta', mensagem: error.message})
  }
};
