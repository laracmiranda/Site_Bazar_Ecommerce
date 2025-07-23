// src/routes/item.routes.js
import express from 'express';
import multer from 'multer';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByCategory,
  getItemsByOwner,
  searchItems,
  getActiveItems
} from '../controllers/item.controller.js';
import { autenticar } from '../middlewares/auth.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get('/', getAllItems);
router.get('/ativos', getActiveItems);
router.get('/categoria/:categoria', getItemsByCategory);
router.get('/dono/:cpf', getItemsByOwner);
router.get('/buscar/:termo', searchItems);
router.get('/:id', getItemById);

router.post('/', autenticar, upload.single('imagem'), createItem);
router.put('/:id', autenticar, updateItem);
router.delete('/:id', autenticar, deleteItem);

export default router;
