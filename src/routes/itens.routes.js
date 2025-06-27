import express from 'express';
import {getItens, getItemPorId, postItem, putItem, deleteItem} from '../controllers/itens.controller.js';

const router = express.Router();

router.get('/', getItens);
router.get('/:id', getItemPorId);
router.post('/', postItem);
router.put('/:id', putItem);
router.delete('/:id', deleteItem);

export default router;