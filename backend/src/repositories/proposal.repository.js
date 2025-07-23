// src/repositories/proposal.repository.js
import prisma from '../prisma/client.js';

class ProposalRepository {
  findAll() {
    return prisma.proposta.findMany({
      include: {
        DonoItem: true,
        proponente: true,
        itemDesejado: true,
        itemOfertado: true
      }
    });
  }

  findById(id) {
    return prisma.proposta.findUnique({
      where: { id_proposta: id },
      include: {
        DonoItem: true,
        proponente: true,
        itemDesejado: true,
        itemOfertado: true
      }
    });
  }

  findByProponente(cpf) {
    return prisma.proposta.findMany({
      where: { cpf_proponente: cpf },
      include: {
        itemDesejado: true,
        itemOfertado: true
      }
    });
  }

  findByDono(cpf) {
    return prisma.proposta.findMany({
      where: { cpf_dono_item: cpf },
      include: {
        itemDesejado: true,
        itemOfertado: true
      }
    });
  }

  findByStatus(status) {
    return prisma.proposta.findMany({
      where: { status_proposta: status },
      include: {
        itemDesejado: true,
        itemOfertado: true
      }
    });
  }

  create(data) {
    return prisma.proposta.create({ data });
  }

  update(id, data) {
    return prisma.proposta.update({ where: { id_proposta: id }, data });
  }

  delete(id) {
    return prisma.proposta.delete({ where: { id_proposta: id } });
  }
}

export default new ProposalRepository();
