// src/controllers/user.controller.js
import UserService from '../services/user.service.js';

export const createUser = async (req, res, next) => {
  try {
    const novoUsuario = await UserService.create(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const usuarios = await UserService.getAll();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const getUserByCpf = async (req, res, next) => {
  try {
    const { cpf } = req.params;
    const usuario = await UserService.getByCpf(cpf);
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { cpf } = req.params;
    const atualizado = await UserService.update(cpf, req.body);
    res.status(200).json(atualizado);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { cpf } = req.params;
    await UserService.delete(cpf);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
