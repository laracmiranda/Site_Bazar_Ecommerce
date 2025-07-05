import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

export const autenticar = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ erro: 'Acesso não autorizado!' });
    }
        try {
            const decodific = jwt.verify(token, SECRET);
            req.usuario = decodific;
            next();
        } catch (error) {
            return res.status(401).json({ erro:'Token inválido ou expirado'});
        }
};