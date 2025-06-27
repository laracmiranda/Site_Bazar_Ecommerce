import usuariosRepository from '../repositories/usuarios.repository.js';

export const listarUsuarios = async () => {
    return await usuariosRepository.findAll();
};

export const buscarUsuarioPorCpf = async (cpf) => {
    return await usuariosRepository.findById(cpf);
};

export const criarUsuario = async (dados) => {
    return await usuariosRepository.create(dados);
};

export const atualizarUsuario = async (cpf, dados) => {
    return await usuariosRepository.update(cpf, dados);
};

export const removerUsuario = async (cpf) => {
    return await usuariosRepository.delete(cpf);
};

