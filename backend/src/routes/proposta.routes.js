import express from 'express';
import {
  getPropostas,
  getPropostaPorId,
  postProposta,
  putProposta,
  deleteProposta,
  patchStatusProposta,
  getPropostasPendentes,
  getPropostasPorProponente, //Propostas feitas
  getPropostasRecebidasPorUsuario, 
  // getPropostasPorDono, 
  getPropostasPorStatus
} from '../controllers/proposta.controller.js';

import { autenticar } from '../middlewares/auth.js'; 

const router = express.Router();


router.post('/', autenticar, postProposta);
router.put('/:id', autenticar, putProposta);
router.delete('/:id', autenticar, deleteProposta);
router.patch('/:id/status', autenticar, patchStatusProposta);
router.get('/pendentes', autenticar, getPropostasPendentes);
router.get('/proponente/minhas-propostas', autenticar, getPropostasPorProponente);
// router.get('/dono/:cpf', autenticar, getPropostasPorDono);


// Nova rota sem CPF na URL, usa o CPF do token
router.get('/recebidas/minhas', autenticar, getPropostasRecebidasPorUsuario);


router.get('/', getPropostas);
router.get('/:id', getPropostaPorId);
router.get('/status/:status', getPropostasPorStatus);


export default router;