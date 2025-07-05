import express from "express";
import cors from 'cors';
import routes from './src/routes/index.js';
import cookieParser from "cookie-parser";
import authRouter from './src/routes/auth.routes.js'



const app = express();

//Tratar JSON
app.use(express.json());

//Acesso para API
app.use(cors());

//biblioteca cookies
app.use(cookieParser());

//Rota de login ultilizando JASON WEB TOKEN (JWT)
app.use(authRouter);

//Rotas de aplicação
app.use(routes);

//Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    
})
