import React, { useState } from 'react';


export default function CadastroItem() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    status_item: false,
  });
  const [imagem, setImagem] = useState(null);
  const [message, setMessage] = useState('');

  // Exemplo de como obter o ID do usuário logado  const userId = localStorage.getItem('userId'); // ou contexto de autenticação
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage('Você precisa estar logado para cadastrar um item.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('descricao', form.descricao);
    formData.append('categoria', form.categoria);
    formData.append('status_item', form.status_item);
    formData.append('imagem', imagem);

    console.log('Imagem enviada:', imagem);
    console.log([...formData.entries()]);

    try {
      const res = await fetch('http://localhost:3000/itens', {
        method: 'POST',
        body: formData,
        credentials: 'include', //envia os cookies
      });
      
      const data = await res.json();
      setMessage(data.message || 'Item cadastrado com sucesso!');
      setForm({ nome: '', descricao: '', categoria: '', status_item: false });
      setImagem(null);
    } catch (error) {
      setMessage('Erro ao cadastrar item');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <option value="Moda">Moda</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Livros">Livros</option>
            <option value="Casa">Casa</option>
            <option value="Celulares">Celulares</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div>
          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            name="imagem"
            onChange={handleImageChange}
            className="w-full"
            required
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

        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">
          Cadastrar Item
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
