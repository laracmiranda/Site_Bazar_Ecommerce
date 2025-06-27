import propostaRepository from '../repositories/proposta.repository.js';

export const listarPropostas = async () => {
    return await propostaRepository.findAll();
};

export const buscarPropostaPorId = async (id) => {
    return await propostaRepository.findById(id);
};

export const criarProposta = async (dados) => {
    return await propostaRepository.create(dados);
};

export const atualizarProposta = async (id, dados) => {
    return await propostaRepository.update(id, dados);
};

export const removerProposta = async (id) => {
    return await propostaRepository.delete(id);
};

