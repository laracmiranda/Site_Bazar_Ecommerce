import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditarItem() {
  const { id } = useParams();
  console.log("ID vindo do useParams:", id);
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    status_item: false,
  });
  const [imagem, setImagem] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Buscar dados do item para preencher o formulário

    if (!id || isNaN(Number(id))) {
    console.warn("ID inválido ou ausente, fetch não será feito.");
    return;
    }

      const fetchItem = async () => {
        try {
          const res = await fetch(`http://localhost:3000/itens/${id}`);
          const data = await res.json();
          console.log("Item carregado:", data);
  
          setForm({
            nome: data.nome,
            descricao: data.descricao,
            categoria: data.categoria,
            status_item: data.status_item,
          });
        } catch (err) {
        console.error("Erro ao buscar item:", err);
        }
      };

      fetchItem();
    }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('descricao', form.descricao);
    formData.append('categoria', form.categoria);
    formData.append('status_item', form.status_item);
    if (imagem) formData.append('imagem', imagem); // Só se imagem nova for enviada

    try {
      const res = await fetch(`http://localhost:3000/itens/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
      throw new Error(`Erro ao buscar item: ${res.status}`);
    }

      const data = await res.json();
      setMessage(data.message || 'Item atualizado com sucesso!');
    } catch (error) {
      setMessage('Erro ao atualizar item');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Editar Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ...mesmo formulário do cadastro... */}
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Categoria:</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="livros">Livros</option>
            <option value="roupas">Roupas</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div>
          <label>Imagem (opcional):</label>
          <input
            type="file"
            accept="image/*"
            name="imagem"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="status_item"
            checked={form.status_item}
            onChange={handleChange}
          />
          <label>Status do item (Disponível?)</label>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Salvar Alterações
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}