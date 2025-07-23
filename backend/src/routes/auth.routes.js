// src/routes/auth.routes.js
import express from 'express';
import { login, logout, sessaoAtual } from '../controllers/auth.controller.js';
import { autenticar } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/sessao', autenticar, sessaoAtual);

export default router;
