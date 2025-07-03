import express from 'express';
import {
  getPropostas,
  getPropostaPorId,
  postProposta,
  putProposta,
  deleteProposta,
  patchStatusProposta,
  listarPropostasPendentes,
  listarPropostasPorProponente,
  listarPropostasPorDono,
  listarPropostasPorStatus
} from '../controllers/proposta.controller.js';

const router = express.Router();

router.get('/', getPropostas);
router.get('/:id', getPropostaPorId);
router.post('/', postProposta);
router.put('/:id', putProposta);
router.delete('/:id', deleteProposta);
router.patch('/:id/status', patchStatusProposta);

// Novas rotas para filtragem de propostas
router.get('/pendentes', listarPropostasPendentes);
router.get('/proponente/:cpf', listarPropostasPorProponente);
router.get('/dono/:cpf', listarPropostasPorDono);
router.get('/status/:status', listarPropostasPorStatus);

export default router;
