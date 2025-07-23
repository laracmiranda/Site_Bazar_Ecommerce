// src/pages/Dashboard.jsx
import { useAuth } from '../hooks/useAuth';
import { Search, ListFilter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const stats = {
    items: 6,
    users: 874,
    exchanges: 1200,
  };

  const items = Array(6).fill(null);

  return (
    <div className="bg-[#f4f4f4] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#B06D6D] text-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold">Negocie. Troque. Descubra.</h1>
          <p className="text-sm md:text-base">
            Junte-se ao nosso mercado impulsionado pela comunidade, onde <br />
            cada item tem o potencial de uma nova história
          </p>

          {!usuario ? (
            <button
              onClick={() => navigate('/registro')}
              className="mt-4 bg-white text-[#B06D6D] px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Cadastre-se →
            </button>
          ) : null}
        </div>
      </section>

      {/* Busca e filtro */}
      <section className="bg-white py-4 px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 shadow justify-center">
        <div className="flex items-center border rounded w-full md:w-1/2 px-3 py-2">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input className="w-full outline-none" placeholder="Buscar Itens" />
        </div>
        <div className="flex items-center border rounded w-full md:w-1/4 px-3 py-2">
          <ListFilter className="w-4 h-4 text-gray-500 mr-2" />
          <select className="w-full outline-none text-gray-500">
            <option>Todas as categorias</option>
            <option>Roupas</option>
            <option>Casacos</option>
            <option>Eletrônicos</option>
          </select>
        </div>
      </section>

      {/* Estatísticas (somente logado) */}
      {usuario && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center p-4 md:px-8">
          <div className="bg-white shadow rounded p-4">
            <p className="text-2xl font-bold">{stats.items}</p>
            <p className="text-gray-500">Itens disponíveis</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <p className="text-2xl font-bold">{stats.users}</p>
            <p className="text-gray-500">Usuários felizes</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <p className="text-2xl font-bold">{stats.exchanges}</p>
            <p className="text-gray-500">Trocas realizadas</p>
          </div>
        </section>
      )}

      {/* Lista de Itens */}
      <section className="px-4 md:px-8 py-6">
        <h3 className="text-xl font-semibold mb-4">Itens disponíveis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((_, index) => (
            <div key={index} className="bg-white rounded shadow p-3 flex flex-col">
              <div className="bg-gray-200 h-40 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-400 text-sm">[imagem]</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm">Nome do Item</h4>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">Livros</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Descrição completa do item aqui limitada em duas linhas...</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-500">Lara</span>
                {usuario ? (
                  <button className="bg-rose-300 text-white px-2 py-1 text-sm rounded hover:bg-rose-400 transition">
                    Fazer proposta
                  </button>
                ) : (
                  <span className="text-xs text-gray-400 italic">Entre para ofertar</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-[#B06D6D] text-white py-10 px-4 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-xl mb-2">bazar.</h4>
            <p className="text-sm">
              Uma plataforma comunitária onde você pode trocar itens que não precisa mais por coisas que deseja.
              Junte-se a milhares de usuários em nosso mercado sustentável.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Links rápidos</h5>
            <ul className="text-sm space-y-1">
              <li><a href="/" className="hover:underline">Início</a></li>
              <li><a href="/registro" className="hover:underline">Cadastre-se</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Contate-nos</h5>
            <p className="text-sm">📧 support@bazar.com</p>
            <p className="text-sm">📞 +55 (99) 9999-3456</p>
          </div>
        </div>
        <div className="border-t border-white mt-8 pt-4 text-sm text-center">
          <p>&copy; 2024 bazar. Todos os direitos reservados</p>
          <p className="mt-2">
            <a href="#" className="hover:underline">Política de Privacidade</a> ·{' '}
            <a href="#" className="hover:underline">Termos de Serviço</a> ·{' '}
            <a href="#" className="hover:underline">Política de Cookies</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
