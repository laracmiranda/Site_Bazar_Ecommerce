// src/routes/proposal.routes.js
import express from 'express';
import {
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
  deleteProposal,
  updateProposalStatus,
  getByProponente,
  getByDono,
  getByStatus
} from '../controllers/proposal.controller.js';

const router = express.Router();

router.get('/', getAllProposals);
router.get('/:id', getProposalById);
router.get('/status/:status', getByStatus);
router.get('/proponente/:cpf', getByProponente);
router.get('/dono/:cpf', getByDono);

router.post('/', createProposal);
router.put('/:id', updateProposal);
router.patch('/:id/status', updateProposalStatus);
router.delete('/:id', deleteProposal);

export default router;
