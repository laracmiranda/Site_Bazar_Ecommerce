import express from 'express';
import {deleteUsuario, getUsuarioPorCpf, getUsuarios, postUsuario, putUsuario, } from '../controllers/usuarios.controller.js';
import {validaCPF} from '../middlewares/validaCPF.js';
import { autenticar } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:cpf', getUsuarioPorCpf);
router.get('/usuarios', autenticar, getUsuarios);
router.post('/', validaCPF, postUsuario);
router.put('/:cpf', putUsuario);
router.delete('/:cpf', deleteUsuario);


export default router;