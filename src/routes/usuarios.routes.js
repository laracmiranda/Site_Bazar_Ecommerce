import express from 'express';
import {
  getUsuarios,
  getUsuarioPorCpf,
  getUsuarioPorEmail,
  getPropostasFeitas,
  getPropostasRecebidas,
  postUsuario,
  putUsuario,
  deleteUsuario
} from '../controllers/usuarios.controller.js';

import {validaCPF} from '../middlewares/validaCPF.js';
import { autenticar } from '../middlewares/auth.js';

const router = express.Router();

// Listar todos os usuários
router.get('/', getUsuarios);

// Buscar usuário por email (pode ser por query param ou rota, aqui usamos rota)
router.get('/email/:email', getUsuarioPorEmail);

// Buscar usuário por CPF
router.get('/:cpf', getUsuarioPorCpf);

//Autenticar usuário
router.get('/usuarios', autenticar, getUsuarios);

// Listar propostas feitas por um usuário
router.get('/:cpf/propostas/feitas', getPropostasFeitas);

// Listar propostas recebidas por um usuário
router.get('/:cpf/propostas/recebidas', getPropostasRecebidas);

// Criar novo usuário
router.post('/', validaCPF, postUsuario);

// Atualizar usuário
router.put('/:cpf', putUsuario);

// Deletar usuário
router.delete('/:cpf', deleteUsuario);

export default router;
