import express from 'express';
import {deleteUsuario, getUsuarioPorCpf, getUsuarios, postUsuario, putUsuario, } from '../controllers/usuarios.controller.js';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:cpf', getUsuarioPorCpf);
router.post('/', postUsuario);
router.put('/:cpf', putUsuario);
router.delete('/:cpf', deleteUsuario);

export default router;