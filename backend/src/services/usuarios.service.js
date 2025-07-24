import bcrypt from 'bcrypt';
import usuariosRepository from '../repositories/usuarios.repository.js';

export const listarUsuarios = async () => {
    return await usuariosRepository.findAll();
};

export const buscarUsuarioPorCpf = async (cpf) => {
    return await usuariosRepository.findUserByCpf(cpf);
};

export const criarUsuario = async (dados) => {
    const saltRounds = 10;

    // Criptografar a senha antes de salvar no banco
    const senhaCriptografada = await bcrypt.hash(dados.senha, saltRounds);

    const usuarioComSenhaSegura = {
        ...dados,
        senha: senhaCriptografada
    };
    return await usuariosRepository.create(usuarioComSenhaSegura);
};

export const buscarUsuarioPorEmail = async (email) => {
    return await usuariosRepository.findUserByEmail(email);
}

export const listarPropostasFeitas = async (cpf) => {
    return await usuariosRepository.findPropostasFeitas(cpf);
}

export const listarPropostasRecebidas = async (cpf) => {
    return await usuariosRepository.findPropostasRecebidas(cpf);
}

export const atualizarUsuario = async (cpf, dados) => {
    return await usuariosRepository.update(cpf, dados);
};

export const removerUsuario = async (cpf) => {
    return await usuariosRepository.delete(cpf);
};

