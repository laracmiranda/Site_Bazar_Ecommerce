// src/controllers/auth.controller.js
import AuthService from '../services/auth.service.js';

export const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const { token, usuario } = await AuthService.login(email, senha);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1h
    });

    return res.status(200).json({
      mensagem: 'Login efetuado com sucesso!',
      usuario,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ mensagem: 'Desconectado com sucesso!' });
};

export const sessaoAtual = (req, res) => {
  try {
    const { email } = req.usuario;
    if (!email) {
      return res.status(401).json({ erro: 'Não autenticado.' });
    }
    return res.status(200).json({ usuario: { email } });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno', mensagem: error.message });
  }
};
