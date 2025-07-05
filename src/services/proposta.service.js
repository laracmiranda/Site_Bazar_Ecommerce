import prisma from '../prisma/client.js';
import propostaRepository from '../repositories/proposta.repository.js';

export const listarPropostas = async () => {
    return await propostaRepository.findAll();
};

export const buscarPropostaPorId = async (id) => {
    return await propostaRepository.findById(id);
};

export const criarProposta = async ({ item_ofertado, item_desejado, cpf_proponente }) => {
    if (item_ofertado === item_desejado) {
        throw new Error("Não é possível trocar um item por ele mesmo.");
    }

    const itemDesejado = await prisma.itens.findUnique({
        where: { id_item: item_desejado }
    });

    if (!itemDesejado) {
        throw new Error("Item desejado não encontrado.");
    }

    if (itemDesejado.cpf_dono === cpf_proponente) {  
        throw new Error("Você não pode propor troca com seu próprio item.");
    }

    return await propostaRepository.create({ item_ofertado, item_desejado, cpf_proponente });
};

export const atualizarProposta = async (id, dados) => {
    return await propostaRepository.update(id, dados);
};

export const removerProposta = async (id) => {
    return await propostaRepository.delete(id);
};

export const atualizarStatusProposta = async (id, status_proposta) => {
    const proposta = await propostaRepository.findById(id);

    if (!proposta) {
        throw new Error('Proposta não encontrada');
    }

    if (['aceita', 'rejeitada'].includes(proposta.status_proposta)) {  
        throw new Error('Não é possível alterar o status de uma proposta já finalizada');
    }

    if (!['aceita', 'rejeitada'].includes(status_proposta)) {  
        throw new Error('Status inválido. Use "aceita" ou "rejeitada".');
    }

    // Atualiza status da proposta
    await propostaRepository.update(id, { status_proposta });

    if (status_proposta === 'aceita') {
        const { item_ofertado, item_desejado } = proposta;

        // Marcar itens como indisponíveis
        await prisma.itens.update({
            where: { id_item: item_ofertado },
            data: { status_item: false },
        });

        await prisma.itens.update({
            where: { id_item: item_desejado },
            data: { status_item: false },  // corrigido para status_item
        });

        // Rejeitar outras propostas pendentes envolvendo esses itens
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