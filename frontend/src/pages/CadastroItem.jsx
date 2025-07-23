// src/pages/CadastroItem.jsx
import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function CadastroItem() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    status_item: true,
    imagem: null,
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  }

  function handleFile(e) {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, imagem: file }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('descricao', form.descricao);
    formData.append('categoria', form.categoria);
    formData.append('status_item', form.status_item);
    formData.append('cpf_dono', usuario.cpf);
    if (form.imagem) {
      formData.append('imagem', form.imagem);
    }

    try {
      await api.post('/itens', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSucesso('Item cadastrado com sucesso!');
      setTimeout(() => navigate('/meus-itens'), 1500);
    } catch (err) {
      setErro('Erro ao cadastrar item.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-xl"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4">Cadastro de Item</h2>

        {erro && <p className="text-red-500 mb-2">{erro}</p>}
        {sucesso && <p className="text-green-600 mb-2">{sucesso}</p>}

        <input
          type="text"
          name="nome"
          placeholder="Nome do item"
          value={form.nome}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="status_item"
            checked={form.status_item}
            onChange={handleChange}
            className="mr-2"
          />
          Disponível para troca
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full mb-4"
        />
        <button type="submit" className="bg-green-600 text-white w-full p-2 rounded">
          Cadastrar Item
        </button>
      </form>
    </div>
  );
}
