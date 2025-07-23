// src/services/proposal.service.js
import prisma from '../prisma/client.js';
import ProposalRepository from '../repositories/proposal.repository.js';
import AppError from '../utils/AppError.js';

class ProposalService {
  async create({ item_ofertado, item_desejado, cpf_proponente }) {
    if (item_ofertado === item_desejado) throw new AppError('Itens não podem ser iguais');

    const item = await prisma.itens.findUnique({ where: { id_item: item_desejado } });
    if (!item) throw new AppError('Item desejado não encontrado', 404);

    if (item.cpf_dono === cpf_proponente) throw new AppError('Você não pode propor troca com seu próprio item');

    return await ProposalRepository.create({ item_ofertado, item_desejado, cpf_proponente, cpf_dono_item: item.cpf_dono });
  }

  getAll() {
    return ProposalRepository.findAll();
  }

  getById(id) {
    return ProposalRepository.findById(id);
  }

  update(id, data) {
    return ProposalRepository.update(id, data);
  }

  delete(id) {
    return ProposalRepository.delete(id);
  }

  getByProponente(cpf) {
    return ProposalRepository.findByProponente(cpf);
  }

  getByDono(cpf) {
    return ProposalRepository.findByDono(cpf);
  }

  getByStatus(status) {
    return ProposalRepository.findByStatus(status);
  }

  async updateStatus(id, status_proposta) {
    const proposta = await ProposalRepository.findById(id);
    if (!proposta) throw new AppError('Proposta não encontrada', 404);

    if (['aceita', 'rejeitada'].includes(proposta.status_proposta)) {
      throw new AppError('Status já finalizado.');
    }

    if (!['aceita', 'rejeitada'].includes(status_proposta)) {
      throw new AppError('Status inválido. Use "aceita" ou "rejeitada".');
    }

    await ProposalRepository.update(id, { status_proposta });

    if (status_proposta === 'aceita') {
      const { item_ofertado, item_desejado } = proposta;

      await prisma.itens.updateMany({
        where: { id_item: { in: [item_ofertado, item_desejado] } },
        data: { status_item: false },
      });

      await prisma.proposta.updateMany({
        where: {
          status_proposta: 'pendente',
          id_proposta: { not: id },
          OR: [
            { item_ofertado: item_ofertado },
            { item_desejado: item_desejado },
            { item_ofertado: item_desejado },
            { item_desejado: item_ofertado },
          ],
        },
        data: { status_proposta: 'rejeitada' },
      });
    }

    return { mensagem: `Proposta ${status_proposta} com sucesso.` };
  }
}

export default new ProposalService();
