import itensRepository from '../repositories/itens.repository.js';

export const listarItens = async () => {
    return await itensRepository.findAll();
};

export const criarItem = async (dados) => {
    return await itensRepository.create(dados);
};

export const atualizarItem = async (id, dados) => {
    return await itensRepository.update(id, dados);
};

export const removerItem = async (id) => {
    return await itensRepository.delete(id);
};

export const listarItensPorCategoria = async (categoria) => {
    return await itensRepository.findByCategoria(categoria);
};

export const buscarItensPorPalavraChave = async (termo) => {
    return await itensRepository.buscarPorPalavraChave(termo);
};

export const buscarItemPorId = async (id_item) => {
  return await itensRepository.findById(id_item);
};

export const listarItensAtivos = async () => {
    return await itensRepository.findAtivos();
};

export const listarItensPorDono = async (cpf) => {
    return await itensRepository.findByDono(cpf);
};

export const contarItensAtivos = async () => {
  return await itensRepository.countAtivos();
};