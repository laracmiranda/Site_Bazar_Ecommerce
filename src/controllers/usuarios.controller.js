import {
  listarUsuarios,
  buscarUsuarioPorCpf,
  criarUsuario,
  atualizarUsuario,
  removerUsuario,
} from '../services/usuarios.service.js';

export const getUsuarios  = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.status(200).json(usuarios)
  } catch (error){
    res.status(500).json({erro: 'Erro ao listar usuários', mensagem: error.message});    
  }
};

export const getUsuarioPorCpf = async (req, res) => {
  try{
    const cpf = req.params.cpf;
    const usuario = await buscarUsuarioPorCpf(cpf);

    if(!usuario) return res.status(404).json({erro: 'Usuário não encontrado'});
    res.status(200).json(usuario);
  } catch(error){
    res.status(500).json({erro: 'Erro ao buscar o usuário', mensagem: error.message});
  }
};

export const postUsuario = async (req, res) => {
  try {
    const novoUsuario = await criarUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar o usuário', mensagem: error.message });
  }
};

export const putUsuario = async (req, res) => {
  try{
    const cpf = req.params.cpf;
    const atualizado = await atualizarUsuario(cpf, req.body);
    res.status(200).json(atualizado)
  }  catch(error){
    res.status(400).json({erro: 'Erro ao atualizar o usuário', mensagem: error.message});
  }
};

export const deleteUsuario = async (req, res) => {
  try{
    const cpf = req.params.cpf;
    await removerUsuario(cpf);
    res.status(204).send();
  }  catch(error){
    res.status(400).json({erro: 'Erro ao deletar usuário', mensagem: error.message})
  }
};
