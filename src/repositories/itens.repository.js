import prisma from '../prisma/client.js';

class itensRepository {
    findAll() {
        return prisma.itens.findMany({
            //puxa os itens com os donos
            include: {
                usuarios: true
            }
        })
    };

    findById(id) {
        return prisma.itens.findUnique({
            where: {
                id_item: id
            },
            //puxa o dono do item
            include: {
                usuarios: true
            }
        });
    };

    create(dados) {
        return prisma.itens.create({data: dados});
    };

    update(id, dados) {
        return prisma.itens.update({
            where: {
                id_item: id
            }, 
            data: dados,
        });
    };

    delete(id) {
        return prisma.itens.delete({
            where: {
                id_item: id
            }
        })
    }
}


export default new itensRepository();
