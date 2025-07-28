# <img src="frontend/public/icons/logo.svg" width="30px" height="30px"/> Site Bazar

Projeto de uma loja virtual desenvolvido como projeto final do Bootcamp da Atlântico Avanti. O objetivo foi criar uma interface agradável e funcional para simular um e-commerce simples, com foco na exibição de produtos e boa experiência do usuário, onde os usuários anunciam itens e oferecem todas através de propostas

---

## 📸 Visualização
</br>

>  <img width="480" height="746" alt="image" src="https://github.com/user-attachments/assets/90886396-8249-4a15-8ead-b95bc11d45db" /> 



## 📲 Funcionalidades

- Cadastro e exibição de produtos
- Filtros de busca
- Exibição dos itens disponíveis para troca na Home Page
- Upload de imagens via Cloudinary
- Autenticação de usuários com JWT
- Realização de propostas de troca entre itens
- Exibição de propostas realizadas e recebidas para o usuário autenticado
- Layout responsivo e moderno
- Estilização com Tailwind CSS
- Integração com banco de dados PostgreSQL

---

## 📂 Estrutura de Pastas

```
backend/
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

frontend/
   ├── public/         # logo e animações
   ├── src/ 
      ├── components/
      ├── context/     
      ├── pages/       # páginas do site
      App.jsx
      main.css
      main.jsx
   index.html
```
---

## 🛠️ Tecnologias Utilizadas

### Backend

<p align="left"> 
  <img src="https://img.shields.io/badge/Node.js-b06d6d?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-b06d6d?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-b06d6d?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-b06d6d?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Neon-b06d6d?style=for-the-badge&logo=neon&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-b06d6d?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-b06d6d?style=for-the-badge&logo=jsonwebtoken&logoColor=white" />
</p>

### Frontend
<p align="left">
   <img src="https://img.shields.io/badge/Figma-f8f8f8?style=for-the-badge&logo=figma&logoColor=b06d6d" />
   <img src="https://img.shields.io/badge/Vite-f8f8f8?style=for-the-badge&logo=vite&logoColor=b06d6d" />
   <img src="https://img.shields.io/badge/React-f8f8f8?style=for-the-badge&logo=react&logoColor=b06d6d" />
   <img src="https://img.shields.io/badge/Tailwind_CSS-f8f8f8?style=for-the-badge&logo=tailwind-css&logoColor=b06d6d" />
</p>

---

## 👩‍💻 Como rodar o projeto localmente

### Pré-requisitos

- Node.js
- Banco PostgreSQL (sugestão: usar Neon.tech)
- Conta no Cloudinary

### Clone o repositório

```bash
git clone https://github.com/laracmiranda/Site_Bazar_Ecommerce.git
cd Site_Bazar_Ecommerce
````

### 📦 Instale as dependências

#### Backend

```bash
cd backend
npm install
# configure o .env 
npx prisma migrate dev
npm start
```
Configurando o `.env`
```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>?schema=public

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Aprendizados

* Criação de API REST com autenticação
* Gerenciamento de banco com Prisma ORM
* Upload de imagens com Cloudinary
* Uso do React com Vite para performance
* Estilização com TailwindCSS
* Consumo de API REST com React

---

## 📈 Melhorias Futuras

* Página de perfil do usuário
* Redefinição de senha do usuário
* Correções na lógica de propostas
* Refatorar o código
* Deploy da aplicação *(em andamento)*

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
Sinta-se à vontade para usar, estudar e contribuir! 😊
