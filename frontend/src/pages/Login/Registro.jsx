import React, { useState } from 'react';
import { User, Mail, MapPin, Lock, EyeOff, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [form, setForm] = useState({ nome: '', cpf: '', email: '', endereco: '', senha: ''});
  const [message, setMessage] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const { ...dadosParaEnvio } = form;

  try {
  const res = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosParaEnvio),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    toast.error('Erro inesperado do servidor');
    return;
  }


  if (res.ok) {
    toast.success("Usuário cadastrado com sucesso!");
    setTimeout(() => navigate('/login'), 1000);
  } else {
    toast.error(data.mensagem || 'Erro ao cadastrar usuário');
  }

  setForm({ nome: '', cpf: '', email: '', endereco: '', senha: ''});
} catch (err) {
  toast.error('Erro ao cadastrar usuário');
}
};


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-[#B06D6D] mb-2">Crie sua Conta</h2>
        <p className="text-center text-sm text-[#4E4E4E] mb-6">Junte-se à nossa comunidade hoje</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Nome Completo</label>
            <div className="flex items-center border rounded px-3 py-2 border-[#8D8D8D]">
              <User size={16} className="text-[#8D8D8D] mr-2" />
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Insira seu nome completo"
                className="w-full outline-none text-sm text-[#8D8D8D]"
                required
              />
            </div>
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">CPF</label>
            <div className="flex items-center border rounded px-3 py-2 border-[#8D8D8D]">
              <User size={16} className="text-[#8D8D8D] mr-2" />
              <input
                type="number"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                placeholder="Insira seu nome completo"
                className="w-full outline-none text-sm text-[#8D8D8D]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Email</label>
            <div className="flex items-center border rounded px-3 py-2 border-[#8D8D8D]">
              <Mail size={16} className="text-[#8D8D8D] mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Insira seu e-mail"
                className="w-full outline-none text-sm text-[#8D8D8D]"
                required
              />
            </div>
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Endereço</label>
            <div className="flex items-center border rounded px-3 py-2 border-[#8D8D8D]">
              <MapPin size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                placeholder="Insira seu endereço completo"
                className="w-full outline-none text-sm text-[#8D8D8D]"
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-2.5 text-[#8D8D8D]" />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                name="senha"
                value={form.senha}
                onChange={handleChange}
                placeholder="Insira sua senha"
                className=" w-full outline-none text-sm text-[#8D8D8D] pl-10 pr-10 py-2 border border-[#8D8D8D] rounded-md"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-[#8D8D8D]"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-[#B06D6D] hover:bg-[#c27a7a] text-white py-2 rounded transition mt-4"
          >
            Criar Conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Já possui uma conta?{' '}
          <a href="/login" className="text-[#B06D6D] font-semibold hover:underline">
            Entre aqui
          </a>
        </p>
      </div>
    </div>
  );
}
