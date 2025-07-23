// src/services/item.service.js
import ItemRepository from '../repositories/item.repository.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import UserRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';

class ItemService {
  async create(data, file, email) {
    const dono = await UserRepository.findByEmail(email);
    if (!dono) throw new AppError('Usuário não encontrado', 404);

    let imagemUrl = null;

    if (file && file.buffer) {
      const resultado = await new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream({ folder: 'itens' }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
        streamifier.createReadStream(file.buffer).pipe(upload);
      });

      imagemUrl = resultado.secure_url;
    }

    const novoItem = {
      ...data,
      status_item: data.status_item === 'true' || data.status_item === true,
      cpf_dono: dono.cpf,
      imagem: imagemUrl,
    };

    return await ItemRepository.create(novoItem);
  }

  getAll() {
    return ItemRepository.findAll();
  }

  getById(id) {
    return ItemRepository.findById(id);
  }

  getByCategory(cat) {
    return ItemRepository.findByCategory(cat);
  }

  getByOwner(cpf) {
    return ItemRepository.findByOwner(cpf);
  }

  search(termo) {
    return ItemRepository.searchByKeyword(termo);
  }

  getActive() {
    return ItemRepository.findActive();
  }

  update(id, data) {
    return ItemRepository.update(id, data);
  }

  delete(id) {
    return ItemRepository.delete(id);
  }
}

export default new ItemService();
