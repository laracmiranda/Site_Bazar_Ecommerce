// src/controllers/proposal.controller.js
import ProposalService from '../services/proposal.service.js';

export const createProposal = async (req, res, next) => {
  try {
    const proposta = await ProposalService.create(req.body);
    res.status(201).json(proposta);
  } catch (err) {
    next(err);
  }
};

export const getAllProposals = async (req, res, next) => {
  try {
    const propostas = await ProposalService.getAll();
    res.status(200).json(propostas);
  } catch (err) {
    next(err);
  }
};

export const getProposalById = async (req, res, next) => {
  try {
    const proposta = await ProposalService.getById(Number(req.params.id));
    res.status(200).json(proposta);
  } catch (err) {
    next(err);
  }
};

export const updateProposal = async (req, res, next) => {
  try {
    const atualizada = await ProposalService.update(Number(req.params.id), req.body);
    res.status(200).json(atualizada);
  } catch (err) {
    next(err);
  }
};

export const deleteProposal = async (req, res, next) => {
  try {
    await ProposalService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const updateProposalStatus = async (req, res, next) => {
  try {
    const { status_proposta } = req.body;
    const resultado = await ProposalService.updateStatus(Number(req.params.id), status_proposta);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

export const getByProponente = async (req, res, next) => {
  try {
    const propostas = await ProposalService.getByProponente(req.params.cpf);
    res.status(200).json(propostas);
  } catch (err) {
    next(err);
  }
};

export const getByDono = async (req, res, next) => {
  try {
    const propostas = await ProposalService.getByDono(req.params.cpf);
    res.status(200).json(propostas);
  } catch (err) {
    next(err);
  }
};

export const getByStatus = async (req, res, next) => {
  try {
    const propostas = await ProposalService.getByStatus(req.params.status);
    res.status(200).json(propostas);
  } catch (err) {
    next(err);
  }
};
