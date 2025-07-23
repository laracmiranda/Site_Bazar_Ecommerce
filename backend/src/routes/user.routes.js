// src/routes/user.routes.js
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserByCpf,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { autenticar } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:cpf', getUserByCpf);
router.post('/', createUser);
router.put('/:cpf', autenticar, updateUser);
router.delete('/:cpf', autenticar, deleteUser);

export default router;
