import express from 'express';
import {getItens, getItemPorId, postItem, putItem, deleteItem} from '../controllers/itens.controller.js';

const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get('/', getItens);
router.get('/:id', getItemPorId);
router.post('/', upload.single('imagem'), postItem);
router.put('/:id', putItem);
router.delete('/:id', deleteItem);

export default router;