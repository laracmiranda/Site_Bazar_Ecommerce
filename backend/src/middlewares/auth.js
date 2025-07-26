import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'autentificacao-de-alta-seguranca';

export const autenticar = (req, res, next) => {
    console.log('Cookies recebidos:', req.cookies);
console.log('Authorization header:', req.headers.authorization);
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Lê de cookie ou do header "Authorization: Bearer <token>"
    
    console.log('Middleware autenticar: token =>', token);

    if (!token) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    try {
        const usuario = jwt.verify(token, SECRET);
        console.log('Middleware autenticar: usuário decodificado =>', usuario);
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log('Middleware autenticar: erro na verificação do token =>', error.message);
        return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
};

