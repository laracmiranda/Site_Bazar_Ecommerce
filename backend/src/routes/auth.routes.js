import express from 'express';
import { autenticar } from '../middlewares/auth.js';
import {login, logout, sessaoAtual} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/auth/me', autenticar, sessaoAtual);

export default router;