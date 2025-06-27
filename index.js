import express from "express";
import cors from 'cors';
import routes from './src/routes/index.js';


const app = express();

//Tratar JSON
app.use(express.json());

//Rotas de aplicação
app.use(routes);

//Acesso para API
app.use(cors());


//Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    
})