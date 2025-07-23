import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import itemRoutes from './item.routes.js';
import proposalRoutes from './proposal.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/usuarios', userRoutes);
router.use('/itens', itemRoutes);
router.use('/propostas', proposalRoutes);

export default router;
