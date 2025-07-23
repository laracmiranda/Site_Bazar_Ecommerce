// src/middlewares/errorHandler.js
import AppError from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ erro: err.message });
  }

  return res.status(500).json({ erro: 'Erro interno do servidor' });
};
