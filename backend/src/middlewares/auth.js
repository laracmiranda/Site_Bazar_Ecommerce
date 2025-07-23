// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'autenticacao-segura';

export const autenticar = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ erro: 'Acesso negado!' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado!' });
  }
};
