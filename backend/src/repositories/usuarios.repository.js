import prisma from '../prisma/client.js';

class usuariosRepository {

    // Listar todos os usuários
    findAll() {
        return prisma.usuarios.findMany({  
            // Recupera os itens do usuário que esse usuário é dono         
            include: {
                itens: true
            }
        })
    };

    // Listar usuários através do cpf
    findUserByCpf(cpf) {
        return prisma.usuarios.findUnique({
            where: {
                cpf
            },
           select: {
                cpf: true, senha: true, id_usuario: true
            },
        });
    };

  findUserByEmail(email) {
        return prisma.usuarios.findUnique({
            where: { email },
            select: {
                id_usuario: true,
                email: true,
                nome: true,
                cpf: true,
                senha: true, // necessário para verificar no login
            }
    });
    }


    // Listagem de propostas que o usuário fez

    findPropostasFeitas(cpf) {
        return prisma.usuarios.findUnique({
            where: { cpf },
            include: {
                propostasFeitas: {
                    include: {
                        itemDesejado: true,
                        itemOfertado: true
                    }
                }
            }
        })
    }

    // Listagem de propostas que o usuário recebeu
    
    findPropostasRecebidas(cpf) {
        return prisma.usuarios.findUnique({
            where: { cpf },
            include: {
                propostasRecebidas: {
                    itemDesejado: true,
                    itemOfertado: true
                }
            }
        })
    }

    create(dados) {
        return prisma.usuarios.create({data: dados});
    };

    update(cpf, dados) {
        return prisma.usuarios.update({
            where: {
                cpf
            }, 
            data: dados,
        });
    };

    delete(cpf) {
        return prisma.usuarios.delete({
            where: {
                cpf
            }
        })
    }
}

export default new usuariosRepository();

