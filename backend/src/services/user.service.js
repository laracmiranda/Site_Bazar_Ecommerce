// src/services/user.service.js
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';
import { validarCPF } from '../utils/cpfUtils.js';

class UserService {
  async create(data) {
    const { cpf, email, senha } = data;

    if (!validarCPF(cpf)) throw new AppError('CPF inválido.');
    
    const jaExiste = await UserRepository.findByCpf(cpf);
    if (jaExiste) throw new AppError('CPF já cadastrado.');

    const hash = await bcrypt.hash(senha, 10);
    const dadosComSenhaSegura = { ...data, senha: hash };

    return await UserRepository.create(dadosComSenhaSegura);
  }

  async getAll() {
    return await UserRepository.findAll();
  }

  async getByCpf(cpf) {
    const user = await UserRepository.findByCpf(cpf);
    if (!user) throw new AppError('Usuário não encontrado.', 404);
    return user;
  }

  async update(cpf, data) {
    return await UserRepository.update(cpf, data);
  }

  async delete(cpf) {
    return await UserRepository.delete(cpf);
  }
}

export default new UserService();
