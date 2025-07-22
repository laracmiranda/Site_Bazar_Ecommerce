import express from 'express';
import {
  getItens,
  postItem,
  putItem,
  deleteItem,
  getItensAtivos,
  getItensPorDono,
  getItensPorCategoria,
  getItemPorId,
  getItensPorPalavraChave,
  contarItens
} from '../controllers/itens.controller.js';
import { autenticar } from '../middlewares/auth.js';

const router = express.Router();

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage()});

// Rotas específicas
router.get('/ativos', getItensAtivos);
router.get('/contagem', contarItens);  
router.get('/meus-itens', autenticar, getItensPorDono);
router.get('/:id', getItemPorId);
router.get('/categoria/:categoria', getItensPorCategoria);         
router.get('/buscar/:termo', getItensPorPalavraChave);   
      

// Rotas padrão
router.get('/', getItens);
router.post('/', autenticar, upload.single('imagem'), postItem);
router.put('/:id', autenticar, upload.single('imagem'), putItem);
router.delete('/:id', deleteItem);

export default router;
