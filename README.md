# 🛍️ Projeto AvantiBootcamp – Feira de Trocas

Aplicação de troca de itens criada em Node.js com Express. A aplicação consiste numa plataforma onde os usuários anunciam itens e oferecem trocas através de propostas, com sistema de autenticação usando JWT e armazenamento de imagens em nuvem com Cloudinary. 
> No momento a aplicação está em desenvolvimento e até então o código contém a API e **banco de dados**

---

## 🧰 Tecnologias e Dependências

### 🖥️ Runtime:
- Node.js (versão 14+ recomendada)
- Express

### 📦 Pacotes:
- dotenv
- cors
- cookie-parser
- jsonwebtoken – autenticação via JWT
- pg – driver PostgreSQL
- @prisma/client – ORM
- multer – upload de arquivos
- cloudinary – armazenamento de imagens

### 🔧 Dependências de desenvolvimento:
- nodemon – hot reload no desenvolvimento
- prisma – CLI para migrations e geração de cliente Prisma

---

## 🛠️ Instalação e Setup

1. **Clone a branch `main`**:
   ```bash
   git clone -b dev https://github.com/laracmiranda/Projeto_AvantiBootcamp.git
   cd Projeto_AvantiBootcamp
````

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`**:
   Crie o arquivo `.env` com base no `.env.example` abaixo e insira as credenciais necessárias:

   ```env
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>?schema=public

   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...

   JWT_SECRET=uma-chave-secreta
   ```

4. **Gere o cliente Prisma e aplique as migrations**:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Execute o projeto**:

   * Em desenvolvimento:

     ```bash
     npm run dev
     ```
   * Em produção:

     ```bash
     npm start
     ```

   A aplicação estará disponível em: `http://localhost:3000`

---

## ⚙️ Funcionalidades

* Cadastro e login de usuários (autenticação JWT via cookies).
* CRUD de usuários, itens e propostas.
* Upload de imagens com Multer + Cloudinary.
* Propostas de troca entre usuários.

---

## ✅ Scripts disponíveis

| Script                | Descrição                               |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Executa com Nodemon (reload automático) |
| `npm start`           | Executa versão para produção            |
| `npx prisma generate` | Gera cliente Prisma                     |
| `npx prisma migrate`  | Aplica migrations no banco de dados     |
| `npx prisma studio`   | Abre interface visual do banco de dados |

---

## 🧬 Estrutura de Pastas

```
src/
├── config/      # configuração do cloudinary
├── controllers/ 
├── middlewares/         
├── prisma/
├── repositories/
├── routes/
└── services/
prisma/          # Prisma (schema.prisma)
├── schema.prisma
└── migrations/

index.js
```

---

## 📌 Informações Adicionais

* Cloudinary exige configuração de credenciais no `.env`.
* O banco de dados utiliza o Neon (PostgreSQL).
* JWT é usado para autenticação segura via cookies HTTP-only.
* CORS está configurado para permitir origem do frontend.

---

## 📈 Melhorias Futuras

* Implementar rotas completas para propostas de troca.
* Front-end do projeto em produção
* Possível deploy
