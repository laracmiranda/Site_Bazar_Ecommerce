import {
  listarItens, 
  buscarItemPorId,
  criarItem,
  atualizarItem,
  removerItem,
  listarItensAtivos,
  listarItensPorDono
} from '../services/itens.service.js';


export const getItens = async (req, res) => {
  try {
    const itens = await listarItens();
    res.status(200).json(itens)
  } catch (error){
    res.status(500).json({erro: 'Erro ao listar itens', mensagem: error.message});    
  }
};

export const getItemPorId = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const item = await buscarItemPorId(id);

    if(!item) return res.status(404).json({erro: 'Item não encontrado'});
    res.status(200).json(item);
  } catch(error){
    res.status(500).json({erro: 'Erro ao buscar o item', mensagem: error.message});
  }
};

export const postItem = async (req, res) =>{
  try{
    const novoItem = await criarItem(req.body);
    res.status(201).json(novoItem);
  } catch(error){
    res.status(400).json({erro: 'Erro ao cadastrar o item', mensagem: error.message});
  }
};

export const putItem = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    const atualizado = await atualizarItem(id, req.body);
    res.status(200).json(atualizado)
  }  catch(error){
    res.status(400).json({erro: 'Erro ao atualizar o item', mensagem: error.message});
  }
};

export const deleteItem = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    await removerItem(id);
    res.status(204).send();
  }  catch(error){
    res.status(400).json({erro: 'Erro ao deletar item', mensagem: error.message})
  }
};


export const getItensAtivos = async (req, res) => {
  try {
    const ativos = await listarItensAtivos();
    res.status(200).json(ativos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar itens ativos', mensagem: error.message });
  }
};

export const getItensPorDono = async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const itens = await listarItensPorDono(cpf);

    if (!itens || itens.length === 0) {
      return res.status(404).json({ erro: 'Nenhum item encontrado para este dono' });
    }

    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar itens do dono', mensagem: error.message });
  }
};
