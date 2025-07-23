import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UploadImagem from '../../components/UploadImagem';

export default function EditarItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    status_item: false,
  });
  const [imagem, setImagem] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!id || isNaN(Number(id))) return;

    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:3000/itens/${id}`);
        const data = await res.json();
        setForm({
          nome: data.nome,
          descricao: data.descricao,
          categoria: data.categoria,
          status_item: data.status_item,
        });
      } catch (err) {
        console.error('Erro ao buscar item:', err);
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
    if (imagem) formData.append('imagem', imagem);

    try {
      const res = await fetch(`http://localhost:3000/itens/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      toast.success(data.message || 'Item atualizado com sucesso!');
      setTimeout(() => navigate('/meus-itens'), 1000);
    } catch (error) {
      toast.error('Erro ao atualizar item');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#B06D6D] mb-2">Editar Item</h2>
      <p className="text-center text-sm text-[#4E4E4E] mb-7">Atualize as informações do seu item</p>

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
            placeholder="Atualize a descrição do item..."
            className="w-full border border-[#8D8D8D] text-[#8D8D8D] rounded-md p-2 focus:outline-none focus:ring focus:ring-[#c27a7a]"
            required
          />
        </div>

        <div>
          <UploadImagem handleImageChange={handleImageChange} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Publicar item?</label>
          <div
            onClick={() =>
              setForm({
                ...form,
                status_item: form.status_item === 'true' || form.status_item === true ? 'false' : 'true',
              })
            }
            className={`w-20 h-8 flex items-center justify-between px-1 rounded-full cursor-pointer transition-colors duration-300 ${
              form.status_item === 'true' || form.status_item === true ? 'bg-[#DCFCE7]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-1/2 h-6 rounded-full text-xs font-semibold text-center leading-6 transition-all duration-300 ${
                form.status_item === 'true' || form.status_item === true
                  ? 'bg-white text-[#374151] translate-x-full'
                  : 'bg-white text-gray-600'
              }`}
            >
              {form.status_item === 'true' || form.status_item === true ? 'Sim' : 'Não'}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#B06D6D] hover:bg-[#c27a7a] text-white font-semibold py-2 rounded-md transition"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
