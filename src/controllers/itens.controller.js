import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

import {
  listarItens, 
  buscarItemPorId,
  criarItem,
  atualizarItem,
  removerItem
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

export const postItem = async (req, res) => {
  try {
    const dadosItem = req.body;

    // Faz o upload da imagem para o Cloudinary
    const resultado = await cloudinary.uploader.upload(req.file.path, {
      folder: 'itens',
    });

    // Apaga o arquivo temporário
    fs.unlinkSync(req.file.path);

    // Salva a URL da imagem no corpo do item
    dadosItem.imagem = resultado.secure_url;

    const novoItem = await criarItem(dadosItem);
    res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao cadastrar o item', mensagem: error.message });
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
