// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      setErro('Email ou senha inválidos.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f4f4] px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#B06D6D] mb-2">Bem-vindo de Volta</h1>
      <p className="text-gray-600 mb-6 text-center">Entre na sua conta do bazar.</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        {erro && <p className="text-red-500">{erro}</p>}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <Mail size={16} className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Senha</label>
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <Lock size={16} className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-[#B06D6D] text-white py-2 rounded hover:bg-[#c27a7a] transition"
        >
          Entrar
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-700">
        Não tem uma conta?{' '}
        <Link to="/registro" className="text-[#B06D6D] font-medium hover:underline">
          Cadastre-se aqui
        </Link>
      </p>
    </div>
  );
}
