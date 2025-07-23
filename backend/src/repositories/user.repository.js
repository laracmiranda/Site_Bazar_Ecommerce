// src/repositories/user.repository.js
import prisma from '../prisma/client.js';

class UserRepository {
  findAll() {
    return prisma.usuarios.findMany({ include: { itens: true } });
  }

  findByCpf(cpf) {
    return prisma.usuarios.findUnique({ where: { cpf } });
  }

  findByEmail(email) {
    return prisma.usuarios.findUnique({ where: { email } });
  }

  create(data) {
    return prisma.usuarios.create({ data });
  }

  update(cpf, data) {
    return prisma.usuarios.update({ where: { cpf }, data });
  }

  delete(cpf) {
    return prisma.usuarios.delete({ where: { cpf } });
  }
}

export default new UserRepository();
