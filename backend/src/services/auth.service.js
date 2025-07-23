// src/services/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';

const SECRET = process.env.JWT_SECRET || 'autenticacao-segura';

class AuthService {
  async login(email, senha) {
    const usuario = await UserRepository.findByEmail(email);
    if (!usuario) throw new AppError('Email ou senha inválidos', 401);

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new AppError('Email ou senha inválidos', 401);

    const token = jwt.sign({ email: usuario.email }, SECRET, { expiresIn: '1h' });

    return {
      token,
      usuario: {
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }
}

export default new AuthService();
