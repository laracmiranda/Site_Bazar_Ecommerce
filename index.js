import express from "express";
import { PrismaClient } from "@prisma/client";
import routes from './src/routes/index.js';

const prisma = new PrismaClient({ log: ["query", "error"] });
const app = express();

app.use(express.json());

// Rotas da aplicação
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});