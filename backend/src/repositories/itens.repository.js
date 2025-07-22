import prisma from '../prisma/client.js';

class itensRepository {
  findAll() {
    return prisma.itens.findMany({
      include: {
        donoItem: true, 
      },
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

  findByCategoria(categoria) {
  return prisma.itens.findMany({
    where: {
      categoria: {
        contains: categoria,
        mode: 'insensitive'
      },
      status_item: true
    }
  });
}

findPorPalavraChave(termo) {
  return prisma.itens.findMany({
    where: {
      AND: [
        { status_item: true },
        {
          OR: [
            { nome: { contains: termo, mode: 'insensitive' } },
            { descricao: { contains: termo, mode: 'insensitive' } }
          ]
        }
      ]
    }
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

  findById(id) {
  return prisma.itens.findUnique({
    where: { id_item: id },
    include: {
      donoItem: true,
    },
  });
}

  countAtivos() {
  return prisma.itens.count({
    where: {
      status_item: true,
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
