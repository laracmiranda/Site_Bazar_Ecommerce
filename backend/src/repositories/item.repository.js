// src/repositories/item.repository.js
import prisma from '../prisma/client.js';

class ItemRepository {
  findAll() {
    return prisma.itens.findMany({ include: { donoItem: true } });
  }

  findById(id) {
    return prisma.itens.findUnique({ where: { id_item: id }, include: { donoItem: true } });
  }

  findByCategory(cat) {
    return prisma.itens.findMany({
      where: {
        categoria: {
          contains: cat,
          mode: 'insensitive',
        },
      },
    });
  }

  searchByKeyword(term) {
    return prisma.itens.findMany({
      where: {
        OR: [
          { nome: { contains: term, mode: 'insensitive' } },
          { descricao: { contains: term, mode: 'insensitive' } },
        ],
      },
    });
  }

  findByOwner(cpf) {
    return prisma.itens.findMany({
      where: { cpf_dono: cpf },
    });
  }

  findActive() {
    return prisma.itens.findMany({ where: { status_item: true } });
  }

  create(data) {
    return prisma.itens.create({ data });
  }

  update(id, data) {
    return prisma.itens.update({ where: { id_item: id }, data });
  }

  delete(id) {
    return prisma.itens.delete({ where: { id_item: id } });
  }
}

export default new ItemRepository();
