import prisma from '../prisma/client.js';

export async function findAll(req, res) {
  const usuarios = await prisma.usuarios.findMany();
  res.json(usuarios);
}

export async function create(req, res) {
  const novoUsuario = await prisma.usuarios.create({
    data: req.body,
  });
  res.status(201).json(novoUsuario);
}


