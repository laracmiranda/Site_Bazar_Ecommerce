// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [cpf, setCPF] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf, senha }),
      credentials: 'include',
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      login(data); // passa o token para o contexto
      navigate('/');
    } else {
      alert('Login falhou');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 space-y-4">
      <input
        type="text"
        value={cpf}
        onChange={(e) => setCPF(e.target.value)}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">
        Entrar
      </button>
    </form>
  );
}
