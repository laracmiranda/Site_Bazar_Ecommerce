import prisma from '../prisma/client.js';

class propostaRepository {

    findAll() {
        return prisma.proposta.findMany({
                include: {
                DonoItem: true,
                proponente: true,
                itemDesejado: {
                    include: {
                    DonoItem: true,
                    },
                },
                itemOfertado: {
                    include: {
                    DonoItem: true,
                    },
                },
            },
        });
    }

    
    findById(id) {
        return prisma.proposta.findUnique({
            where: {
                id_proposta: id
            },
            include: {
                DonoItem: true,
                proponente: true,
                itemDesejado: true,
                itemOfertado: true
            }
        });
    };


    findPendentes() {
        return prisma.proposta.findMany({
            where: { status_proposta: 'pendente' },
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
            select: {
                id_proposta: true,
                status_proposta: true,

                // Dados do item desejado
                itemDesejado: {
                    select: {
                        nome: true,
                        categoria: true,
                        imagem: true,
                    },
                },

                // Dados do item ofertado
                itemOfertado: {
                    select: {
                        nome: true,
                        categoria: true,
                        imagem: true,
                    },
                },

                // Dados do proponente (usuário logado)
                proponente: {
                    select: {
                        nome: true,
                    },
                },

                // Dono do item desejado (quem vai receber a proposta)
                DonoItem: {
                    select: {
                        nome: true,
                    },
                },
            },
        });
    }


    //Achar propostas de acordo com o dono
    findByDonoItem(cpf) {
        return prisma.proposta.findMany({
            where: {cpf_dono_item: cpf}, 
            include: {
                DonoItem: true,
                proponente: true,
                itemDesejado: true,
                itemOfertado: true
            }
        });
    }


    //Achar propostas de acordo com o status
    findByStatus(status) {
        return prisma.proposta.findMany({
            where: { status_proposta: status },
            include: {
                DonoItem: true,
                proponente: true,
                itemDesejado: true,
                itemOfertado: true
            }
        });
    }
    

    create(dados) {
        return prisma.proposta.create({ data: dados });
    };

    update(id, dados) {
        return prisma.proposta.update({
            where: {
                id_proposta: id
            }, 
            data: dados,
        });
    };

    delete(id) {
        return prisma.proposta.delete({
            where: {
                id_proposta: id
            }
        })
    }
}


export default new propostaRepository();
