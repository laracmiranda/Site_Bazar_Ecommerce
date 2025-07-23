// src/controllers/item.controller.js
import ItemService from '../services/item.service.js';

export const createItem = async (req, res, next) => {
  try {
    const item = await ItemService.create(req.body, req.file, req.usuario.email);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const getAllItems = async (req, res, next) => {
  try {
    const items = await ItemService.getAll();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const item = await ItemService.getById(Number(req.params.id));
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const item = await ItemService.update(Number(req.params.id), req.body);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    await ItemService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getItemsByCategory = async (req, res, next) => {
  try {
    const items = await ItemService.getByCategory(req.params.categoria);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const getItemsByOwner = async (req, res, next) => {
  try {
    const items = await ItemService.getByOwner(req.params.cpf);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const searchItems = async (req, res, next) => {
  try {
    const items = await ItemService.search(req.params.termo);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const getActiveItems = async (req, res, next) => {
  try {
    const items = await ItemService.getActive();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};
