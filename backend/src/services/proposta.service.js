import prisma from '../prisma/client.js';
import propostaRepository from '../repositories/proposta.repository.js';
import itensRepository from '../repositories/itens.repository.js';

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

  const [itemDesejado, itemOfertado] = await Promise.all([
    itensRepository.findById(item_desejado),
    itensRepository.findById(item_ofertado),
  ]);

  if (!itemDesejado || !itemOfertado) {
    throw new Error("Item ofertado ou item desejado não encontrado.");
  }

  if (!itemDesejado.status_item) {
    throw new Error("O item desejado está indisponível para troca.");
  }

  if (itemOfertado.status_item) {
    throw new Error("Seu item ofertado já está sendo usado em outra troca.");
  }

  if (itemDesejado.cpf_dono === itemOfertado.cpf_dono) {
    throw new Error("Você não pode propor troca entre seus próprios itens.");
  }

  if (cpf_proponente === itemDesejado.cpf_dono) {
    throw new Error("Você não pode propor trocas com itens seus.");
  }

  const proponenteExiste = await prisma.usuarios.findUnique({ where: { cpf: cpf_proponente } });
  if (!proponenteExiste) {
    throw new Error("Usuário proponente não encontrado.");
  }

  const propostaDuplicada = await prisma.proposta.findFirst({
    where: {
      item_ofertado,
      item_desejado,
      cpf_proponente,
      status_proposta: 'pendente',
    },
  });

  if (propostaDuplicada) {
    throw new Error("Já existe uma proposta pendente com esses itens.");
  }

  const propostasPendentes = await prisma.proposta.count({
    where: {
      cpf_proponente,
      status_proposta: 'pendente',
    },
  });


  // Criar a proposta
  const propostaCriada = await propostaRepository.create({
    item_ofertado,
    item_desejado,
    cpf_dono_item: itemDesejado.cpf_dono,
    cpf_proponente,
    status_proposta: 'pendente',
  });

  // Atualizar status dos itens usando o repository
  await Promise.all([
    itensRepository.update(item_ofertado, { status_item: true }),
    itensRepository.update(item_desejado, { status_item: true }),
  ]);

  return propostaCriada;
};

export const removerProposta = async (id) => {
    return await propostaRepository.delete(id);
};



export const atualizarStatusProposta = async (id, status_proposta) => {
  const proposta = await propostaRepository.findById(id);
  if (!proposta) {
    throw new Error('Proposta não encontrada');
  }

  const statusAtual = proposta.status_proposta;

  // Impedir alterações em propostas já finalizadas
  if (['aceita', 'rejeitada', 'cancelada'].includes(statusAtual)) {
    throw new Error('Não é possível alterar o status de uma proposta finalizada.');
  }

  // Validar entrada
  if (!['aceita', 'rejeitada', 'cancelada'].includes(status_proposta)) {
    throw new Error('Status inválido. Use "aceita", "rejeitada" ou "cancelada".');
  }

  // Atualizar status
  await propostaRepository.update(id, { status_proposta });

  const { item_ofertado, item_desejado } = proposta;

  if (status_proposta === 'aceita') {
    // Itens permanecem indisponíveis (já estão com status_item = false)
    // Rejeitar outras propostas com os mesmos itens
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

  if (status_proposta === 'rejeitada' || status_proposta === 'cancelada') {
    // Liberar os itens para novas propostas
    await Promise.all([
      itensRepository.update(item_ofertado, { status_item: false }),
      itensRepository.update(item_desejado, { status_item: false }),
    ]);
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