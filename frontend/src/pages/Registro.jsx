// src/pages/Registro.jsx
import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Registro() {
  const [form, setForm] = useState({
    cpf: '',
    nome: '',
    email: '',
    senha: '',
    endereco: '',
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      await api.post('/usuarios', form);
      setSucesso('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err?.response?.data?.mensagem) {
        setErro(err.response.data.mensagem);
      } else {
        setErro('Erro ao registrar. Tente novamente.');
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f4f4] px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#B06D6D] mb-2">Crie sua Conta</h1>
      <p className="text-gray-600 mb-6 text-center">Junte-se à nossa comunidade hoje</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm">{sucesso}</p>}

        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={form.nome}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="w-full bg-[#B06D6D] text-white py-2 rounded hover:bg-[#c27a7a] transition">
          Criar Conta
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-700">
        Já possui uma conta?{' '}
        <Link to="/login" className="text-[#B06D6D] font-medium hover:underline">
          Entre aqui
        </Link>
      </p>
    </div>
  );
}
