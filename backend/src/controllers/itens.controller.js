import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

import {
  listarItens,
  buscarItemPorId,
  criarItem,
  atualizarItem,
  removerItem,
  listarItensAtivos,
  listarItensPorDono,
  listarItensPorCategoria,
  buscarItensPorPalavraChave
} from '../services/itens.service.js';

export const getItens = async (req, res) => {
  try {
    const itens = await listarItens();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar itens', mensagem: error.message });
  }
};

export const getItemPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await buscarItemPorId(id);

    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar o item', mensagem: error.message });
  }
};

export const postItem = async (req, res) => {
  try {
    const dadosItem = {
      ...req.body,
      status_item: req.body.status_item === 'true',
      cpf_dono: req.usuario.cpf, // Puxa o CPF do usuário autenticado
    };
    console.log('req.file:', req.file);

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ erro: 'Arquivo não encontrado', mensagem: 'Nenhuma imagem foi enviada' });
    }

    // Faz o upload da imagem para o Cloudinary
    const resultado = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({folder: 'itens'},
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ); 

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Apaga o arquivo temporário
    //fs.unlinkSync(req.file.path);

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
  try {
    const id = parseInt(req.params.id);
    const atualizado = await atualizarItem(id, req.body);
    res.status(200).json(atualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar o item', mensagem: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await removerItem(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao deletar item', mensagem: error.message });
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

export const getItensPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const itens = await listarItensPorCategoria(categoria);

    if (!itens || itens.length === 0) {
      return res.status(404).json({ erro: 'Nenhum item encontrado para esta categoria' });
    }

    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar por categoria', mensagem: error.message });
  }
};

export const getItensPorPalavraChave = async (req, res) => {
  try {
    const { termo } = req.params;
    const itens = await buscarItensPorPalavraChave(termo);

    if (!itens || itens.length === 0) {
      return res.status(404).json({ erro: 'Nenhum item encontrado com esse termo' });
    }

    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro na busca por palavra-chave', mensagem: error.message });
  }
};
