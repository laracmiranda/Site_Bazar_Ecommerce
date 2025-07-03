import express from 'express';
import { deleteProposta, getPropostaPorId, getPropostas, postProposta, putProposta } from '../controllers/proposta.controller.js';

const router = express.Router();

router.get('/', getPropostas);
router.get('/:id', getPropostaPorId);
router.post('/', postProposta);
router.put('/:id', putProposta);
router.delete('/:id', deleteProposta);


export default router;