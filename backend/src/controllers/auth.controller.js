import { buscarUsuarioPorCpf } from "../services/usuarios.service.js";
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'autentificacao-de-alta-seguranca';

export const login = async (req, res) => {
    try {
        const {cpf, senha} = req.body;
        const usuario = await buscarUsuarioPorCpf(cpf);
        
        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ erro: 'CPF ou senha invalidos'});
        }

        const token = jwt.sign ({ cpf: usuario.cpf}, SECRET, { expiresIn: '1h'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prduction',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, //uma hora
        });

        res.status(200).json({mensagem: 'Login efetuado com sucesso!' });
    } catch (erro) {
        return res.status(401).json({message: erro.message});
        //res.status(500).json({ erro: 'Erro ao efetuar login!', mensagem: erro.mensagem});
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ mensagem: 'Desconectado com sucesso!'});
};

export const sessaoAtual = (req, res) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({error: 'Usuário não autenticado'});
        }
        return res.status(200).json({user});
    } catch (error){
        return res.status(500).json({error: 'Erro interno no servidor', message: error.message});
    }
}