import { buscarUsuarioPorEmail } from "../services/usuarios.service.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const SECRET = process.env.JWT_SECRET || 'autentificacao-de-alta-seguranca';

export const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await buscarUsuarioPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        console.log("Senha válida?", senhaValida);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha incorreta" });
        }

        // Gera o token com os dados do usuário
        const token = jwt.sign(
        { cpf: usuario.cpf, email: usuario.email, nome: usuario.nome },
        SECRET,
        { expiresIn: '1h' }
        );

        res.cookie('token', token, {
        httpOnly: true,
        secure: false, // true se estiver usando HTTPS
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 dia por exemplo
        });

        return res.status(200).json({ 
            // mensagem: "Login bem-sucedido",
            token,
            user: {
                id_usuario: usuario.id_usuario, // <-- só se existir esse campo no banco
                email: usuario.email,
                nome: usuario.nome,
                cpf: usuario.cpf,
            }
        });

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
};


export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ mensagem: 'Desconectado com sucesso!'});
};

export const sessaoAtual = (req, res) => {
    try {
        const user = req.usuario;
        if(!user){
            return res.status(401).json({error: 'Usuário não autenticado'});
        }
        return res.status(200).json({user});
    } catch (error){
        return res.status(500).json({error: 'Erro interno no servidor', message: error.message});
    }
}