import prisma from '../prisma/client.js';
import propostaRepository from '../repositories/proposta.repository.js';

export const listarPropostas = async () => {
    return await propostaRepository.findAll();
};

export const buscarPropostaPorId = async (id) => {
    return await propostaRepository.findById(id);
};

export const criarProposta = async ({ item_ofertado, item_desejado, cpf_dono_item_desejado, cpf_proponente }) => { // Adicione cpf_proponente aqui!
    // Validação: Não é possível trocar um item por ele mesmo.
    if (item_ofertado === item_desejado) {
        throw new Error("Não é possível trocar um item por ele mesmo.");
    }
    const itemDesejado = await prisma.itens.findUnique({
        where: { id_item: item_desejado }
    });

    if (!itemDesejado) {
        throw new Error("Item desejado não encontrado.");
    }

    const itemOfertadoObjeto = await prisma.itens.findUnique({
        where: { id_item: item_ofertado }
    });

    if (!itemOfertadoObjeto) {
        throw new Error("Item ofertado não encontrado.");
    }

    if (itemDesejado.cpf_dono === itemOfertadoObjeto.cpf_dono) {
        throw new Error("Você não pode propor troca entre seus próprios itens. Os itens devem pertencer a pessoas diferentes.");
    }

    if (cpf_proponente === itemDesejado.cpf_dono) {
      throw new Error("Você não pode fazer uma proposta para seu próprio item desejado.");
    }
  
    if (cpf_proponente === itemDesejado.cpf_dono) {
      throw new Error("Você não pode oferecer seu próprio item para si mesmo.");
    }

    cpf_dono_item_desejado = itemDesejado.cpf_dono;

    return await propostaRepository.create({
        item_ofertado: item_ofertado,
        item_desejado: item_desejado,
        cpf_dono_item: cpf_dono_item_desejado, 
        cpf_proponente: cpf_proponente 
    });

};

export const removerProposta = async (id) => {
    return await propostaRepository.delete(id);
};

// ... outros imports

export const atualizarStatusProposta = async (id, status_proposta) => {
    const proposta = await propostaRepository.findById(id);

    if (!proposta) {
        throw new Error('Proposta não encontrada');
    }

    // --- IMPORTANTE: ESTE É O BLOCO QUE DEVE PERMITIR 'CANCELADA' ---
    if (proposta.status_proposta === 'pendente' && status_proposta === 'cancelada') {
        await propostaRepository.update(id, { status_proposta });
        // O retorno aqui é crucial, para não cair nas outras validações
        return { mensagem: `Proposta ${status_proposta} com sucesso.` };
    }
    // -----------------------------------------------------------------

    // As próximas validações são para 'aceita' e 'rejeitada'
    // E também impede que status finalizados (aceita, rejeitada, cancelada) sejam alterados
    if (['aceita', 'rejeitada', 'cancelada'].includes(proposta.status_proposta)) {
        throw new Error('Não é possível alterar o status de uma proposta já finalizada (aceita, rejeitada ou cancelada).');
    }

    // Esta validação só deve ser alcançada se o status_proposta NÃO for 'cancelada'
    // e se não for 'aceita' ou 'rejeitada'.
    // Se você tentar enviar algo diferente de 'aceita', 'rejeitada' OU 'cancelada',
    // essa linha abaixo irá capturar.
    if (!['aceita', 'rejeitada'].includes(status_proposta)) {
        throw new Error('Status inválido. Para aceitar/rejeitar, use "aceita" ou "rejeitada".');
    }

    // Se chegou até aqui, significa que o status_proposta é 'aceita' ou 'rejeitada'
    // E a proposta não estava em um status finalizado.
    await propostaRepository.update(id, { status_proposta });

    if (status_proposta === 'aceita') {
        const { item_ofertado, item_desejado } = proposta;

        await prisma.itens.update({
            where: { id_item: item_ofertado },
            data: { status_item: false },
        });

        await prisma.itens.update({
            where: { id_item: item_desejado },
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
};

export const listarPropostasPendentes = () => {
  return propostaRepository.findPendentes();
};

export const listarPropostasPorProponente = (cpf) => {
  return propostaRepository.findByProponente(cpf);
};

export const listarPropostasPorDono = (cpf) => {
  return propostaRepository.findByDonoItem(cpf);
};

export const listarPropostasPorStatus = (status) => {
  return propostaRepository.findByStatus(status);
};