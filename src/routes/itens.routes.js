import express from 'express';
import {
  getItens,
  getItemPorId,
  postItem,
  putItem,
  deleteItem,
  getItensAtivos,
  getItensPorDono,
  getItensPorCategoria,
  getItensPorPalavraChave
} from '../controllers/itens.controller.js';

const router = express.Router();

// Rotas específicas
router.get('/ativos', getItensAtivos);
router.get('/dono/:cpf', getItensPorDono);
router.get('/categoria/:categoria', getItensPorCategoria);         
router.get('/buscar/:termo', getItensPorPalavraChave);           

// Rotas padrão
router.get('/', getItens);
router.get('/:id', getItemPorId);
router.post('/', postItem);
router.put('/:id', putItem);
router.delete('/:id', deleteItem);

export default router;
