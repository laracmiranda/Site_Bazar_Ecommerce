import express from "express";
import cors from 'cors';
import routes from './src/routes/index.js';
import cookieParser from "cookie-parser";
import authRouter from './src/routes/auth.routes.js'


const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://site-bazar.vercel.app/',
];

//Tratar JSON
app.use(express.json());

//Acesso para API
app.use(cors({
  origin: function (origin, callback) {
    console.log("🔎 Origem da requisição:", origin);
    // Permite requisições sem origin (ex: mobile/postman) ou de origens confiáveis
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("⛔ Origem bloqueada pelo CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

//biblioteca cookies
app.use(cookieParser());

//Rota de login ultilizando JASON WEB TOKEN (JWT)
app.use(authRouter);

//Rotas de aplicação
app.use(routes);

//Rota raiz de teste
app.get('/', (req, res) => {
  res.send('API do Bazar funcionando! 🚀');
});

//Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    
})
