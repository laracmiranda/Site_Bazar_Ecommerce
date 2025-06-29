import prisma from '../prisma/client.js';

class propostaRepository {
    findAll() {
        return prisma.proposta.findMany({            
            include: {
                usuarios: true,
                itens_proposta_item_desejadoToitens: true,
                itens_proposta_item_ofertadoToitens: true
            }
        });
    };

    findById(id) {
        return prisma.proposta.findUnique({
            where: {
                id_proposta: id
            },
            
            include: {
                usuarios: true,
                itens_proposta_item_desejadoToitens: true,
                itens_proposta_item_ofertadoToitens: true

            }
        });
    };

    create(dados) {
        return prisma.proposta.create({data: dados});
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
