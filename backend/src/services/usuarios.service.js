import usuariosRepository from '../repositories/usuarios.repository.js';
import bcrypt from 'bcrypt';


export const listarUsuarios = async () => {
    return await usuariosRepository.findAll();
};

export const buscarUsuarioPorCpf = async (cpf) => {
    return await usuariosRepository.findUserByCpf(cpf);
};

export const criarUsuario = async (dados) => {
    const { senha } = dados;
    if (!senha) throw new Error("Senha não fornecida");

    const senhaCriptografada = await bcrypt.hash(senha, 10);

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

