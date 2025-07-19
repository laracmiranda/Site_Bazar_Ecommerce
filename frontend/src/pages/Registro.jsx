// src/pages/Home.jsx
import { User, Lock, Eye, EyeOff , Mail, MapPin} from 'lucide-react';
import React, { useState } from 'react';

export default function Registro() {
  const [form, setForm] = useState({ nome: '', email: '', cpf: '', endereco: '', senha: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message);
      setForm({ nome: '', email: '', cpf: '', endereco: '', senha: ''}); // limpa formulário
    } catch (err) {
      setMessage('Erro ao cadastrar usuário');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input className="w-full border p-2 rounded" type="text" name="nome" value={form.nome} onChange={handleChange} required />
        </div>
        <div>
          <label>E-mail:</label>
          <input className="w-full border p-2 rounded" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>CPF:</label>
          <input className="w-full border p-2 rounded" type="text" name="cpf" value={form.cpf} onChange={handleChange} required />
        </div>
        <div>
          <label>Endereço:</label>
          <input className="w-full border p-2 rounded" type="text" name="endereco" value={form.endereco} onChange={handleChange} required />
        </div>
        <div>
          <label>Senha:</label>
          <input className="w-full border p-2 rounded" type="password" name="senha" value={form.senha} onChange={handleChange} required />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}