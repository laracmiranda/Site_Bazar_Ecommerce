import prisma from '../prisma/client.js';

class itensRepository {
  findAll() {
    return prisma.itens.findMany({
      include: {
        donoItem: true, 
      },
    });
  }

  findById(id) {
    return prisma.itens.findUnique({
      where: { id_item: id },
      include: { donoItem: true },
    });
  }

  findAtivos() {
    return prisma.itens.findMany({
      where: {
        status_item: true,
      },
      include: {
        donoItem: true,
      },
    });
  }

  findByDono(cpf) {
    return prisma.itens.findMany({
      where: {
        cpf_dono: cpf,
      },
      include: {
        donoItem: true,
      },
    });
  }

  create(dados) {
    return prisma.itens.create({
      data: dados,
    });
  }

  update(id, dados) {
    return prisma.itens.update({
      where: { id_item: id },
      data: dados,
    });
  }

  delete(id) {
    return prisma.itens.delete({
      where: { id_item: id },
    });
  }
}

export default new itensRepository();
