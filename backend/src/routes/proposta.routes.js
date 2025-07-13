import express from 'express';
import {
  getPropostas,
  getPropostaPorId,
  postProposta,
  putProposta,
  deleteProposta,
  patchStatusProposta,
  getPropostasPendentes,
  getPropostasPorProponente,
  getPropostasPorDono,
  getPropostasPorStatus
} from '../controllers/proposta.controller.js';

const router = express.Router();

router.get('/', getPropostas);
router.get('/:id', getPropostaPorId);
router.post('/', postProposta);
router.put('/:id', putProposta);
router.delete('/:id', deleteProposta);
router.patch('/:id/status', patchStatusProposta);

// Novas rotas para filtragem de propostas
router.get('/pendentes', getPropostasPendentes);
router.get('/proponente/:cpf', getPropostasPorProponente);
router.get('/dono/:cpf', getPropostasPorDono);
router.get('/status/:status', getPropostasPorStatus);

export default router;
