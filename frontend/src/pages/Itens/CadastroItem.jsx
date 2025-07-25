import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Image } from 'lucide-react';
import UploadImagem from '../../components/UploadImagem';

export default function CadastroItem() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    status_item: '',
  });
  const [imagem, setImagem] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Você precisa estar logado para cadastrar um item.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('descricao', form.descricao);
    formData.append('categoria', form.categoria);
    formData.append('status_item', form.status_item);
    formData.append('imagem', imagem);

    try {
      const res = await fetch('http://localhost:3000/itens', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: formData
      });

      if (res.ok) {
        toast.success('Item cadastrado com sucesso!');
        setForm({ nome: '', descricao: '', categoria: '', status_item: '' });
        setImagem(null);
        setTimeout(() => navigate('/meus-itens'), 1000);
      } else {
        toast.error('Falha ao cadastrar item');
      }
    } catch (error) {
      toast.error('Erro ao cadastrar item');
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div className="w-full max-w-2xl my-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#B06D6D] mb-2">Cadastre seu Item</h2>
      <p className="text-center text-sm text-[#4E4E4E] mb-7">Compartilhe algo que você gostaria de trocar com nossa comunidade</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Nome do Item</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border border-[#8D8D8D] text-[#8D8D8D] rounded-md p-2 focus:outline-none focus:ring focus:ring-[#c27a7a]"
            placeholder="Nome do item aqui"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Categoria</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full border border-[#8D8D8D] text-[#8D8D8D] rounded-md p-2 bg-white focus:outline-none focus:ring focus:ring-[#c27a7a]"
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
          <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows="4"
            placeholder="Descreva seu item, condição e pelo quê está disposto à trocá-lo..."
            className="w-full border border-[#8D8D8D] text-[#8D8D8D] rounded-md p-2 focus:outline-none focus:ring focus:ring-[#c27a7a]"
            required
          />
        </div>

        <div>
          <UploadImagem handleImageChange={handleImageChange} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Publicar item?
          </label>
          <div
            onClick={() =>
              setForm({ ...form, status_item: form.status_item === 'true' ? 'false' : 'true' })
            }
            className={`w-20 h-8 flex items-center justify-between px-1 rounded-full cursor-pointer transition-colors duration-300 ${
              form.status_item === 'true' ? 'bg-[#DCFCE7]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-1/2 h-6 rounded-full text-xs font-semibold text-center leading-6 transition-all duration-300 ${
                form.status_item === 'true'
                  ? 'bg-white text-[#374151] translate-x-full'
                  : 'bg-white text-gray-600'
              }`}
            >
              {form.status_item === 'true' ? 'Sim' : 'Não'}
            </div>
          </div>
        </div>



        <button
          type="submit"
          className="w-full bg-[#B06D6D] hover:bg-[#c27a7a] text-white font-semibold py-2 rounded-md transition"
        >
          Cadastrar Item
        </button>
      </form>
    </div>
    </div>
  );
}