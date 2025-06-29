import itensRepository from '../repositories/itens.repository.js';

export const listarItens = async () => {
    return await itensRepository.findAll();
};

export const buscarItemPorId = async (id) => {
    return await itensRepository.findById(id);
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

