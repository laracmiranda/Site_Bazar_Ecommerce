// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: senha.trim() }),
      credentials: 'include',
    });

    if (res.ok) {
      const data = await res.json();
      login(data); // passa o token para o contexto
      navigate('/');
    } else {
      toast.error('Login falhou');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-[#B06D6D] mb-2">Entrar na Conta</h1>
        <p className="text-center text-sm text-[#4E4E4E] mb-6">Bem-vindo de volta!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Email</label>
            <div className="flex items-center border rounded px-3 py-2 border-[#8D8D8D]">
              <User size={16} className="text-[#8D8D8D] mr-2" />
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu email"
                className="w-full outline-none text-sm text-[#8D8D8D]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#1E1E1E]">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-2.5 text-[#8D8D8D]" />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Insira sua senha"
                className="w-full outline-none text-sm text-[#8D8D8D] pl-10 pr-10 py-2 border border-[#8D8D8D] rounded-md"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B06D6D] hover:bg-[#c27a7a] text-white py-2 rounded transition mt-4"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Ainda não possui uma conta?{' '}
          <Link to="/registro" className="text-[#B06D6D] font-semibold hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
