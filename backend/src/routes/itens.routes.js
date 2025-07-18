import express from 'express';
import {
  getItens,
  postItem,
  putItem,
  deleteItem,
  getItensAtivos,
  getItensPorDono,
  getItensPorCategoria,
  getItensPorPalavraChave
} from '../controllers/itens.controller.js';
import { autenticar } from '../middlewares/auth.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage()});

// Rotas específicas
router.get('/ativos', getItensAtivos);
router.get('/meus-itens', autenticar, getItensPorDono);
router.get('/categoria/:categoria', getItensPorCategoria);         
router.get('/buscar/:termo', getItensPorPalavraChave);           

// Rotas padrão
router.get('/', getItens);
//router.get('/:id', getItemPorId);
router.post('/', autenticar, upload.single('imagem'), postItem);
router.put('/:id', putItem);
router.delete('/:id', deleteItem);

export default router;
