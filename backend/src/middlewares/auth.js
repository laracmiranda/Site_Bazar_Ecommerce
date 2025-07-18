import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

export const autenticar = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Middleware autenticar: token =>', token);

    if (!token) {
        return res.status(401).json({ erro: 'Acesso não autorizado!' });
    }
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario; 

        try {
            const decodific = jwt.verify(token, SECRET);
            console.log('Middleware autenticar: usuário decodificado =>', decodific);
            req.usuario = decodific;
            next();
        } catch (error) {
            console.log('Middleware autenticar: erro na verificação do token =>', error.message);
            return res.status(401).json({ erro:'Token inválido ou expirado'});
        }
};