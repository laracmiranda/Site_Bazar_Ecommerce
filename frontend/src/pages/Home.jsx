import { useAuth } from "../context/AuthContext";
import { Search, Smile, Tag, Instagram, Twitter, ListFilter, MoveRight } from 'lucide-react';
import { Navigate, useNavigate } from "react-router-dom";


export default function Home() {
    const { isAuthenticated } = useAuth();
    
    const navigate = useNavigate();
    const handleCadastroClick = () => {
      navigate("/registro");
    };

    const items = Array(6).fill(null);
    const stats = {
    items: 6, // Substituir por contagem real
    users: 874,
    exchanges: 1200,
  };

  return <>
    <div className="bg-[#f4f4f4] w-full h-full">
    {!isAuthenticated && (
    <section className="h-80 w-full bg-[#B06D6D] py-1 px-1">
        
        <div className="flex flex-col items-center justify-center py-10 text-white text-center gap-8">
            <h1 className="text-5xl font-bold">Negocie. Troque. Descubra.</h1>
            <p className="">Junte-se ao nosso mercado impulsionado pela comunidade, <br />onde cada item tem o potencial de uma nova história</p>
            
            <button onClick={handleCadastroClick} className="font-semibold rounded-md border border-white w-50 h-12 hover:bg-white hover:text-[#B06D6D] cursor-pointer">
              Cadastre-se
            </button>
            
        </div>
    </section>
    )}

    {/* Busca e filtro */}
    <section className="bg-white py-4 px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 shadow justify-center">
        <div className="flex items-center border rounded w-full md:w-1/2 px-3 py-2">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input className="w-full outline-none" placeholder="Buscar Itens" />
        </div>
        <div className="flex items-center border rounded w-full md:w-1/4 px-3 py-2">
            <ListFilter className="w-4 h-4 text-gray-500 mr-2"/>
            <select className="w-full outline-none text-gray-500">
                <option>Todas as categorias</option>
                <option>Roupas</option>
                <option>Casacos</option>
                <option>Eletrônicos</option>
            </select>
        </div>

    </section>
    
    {/* Estatísticas */}
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

    {/* Lista de Itens */}
      <section className="px-4 md:px-8 py-6 flex-1">
        <h3 className="text-xl font-semibold mb-4">Itens disponíveis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded shadow p-3 flex flex-col">
              <div className="bg-gray-200 h-40 rounded mb-3"></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm">Nome do Item</h4>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">Livros</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Descrição completa do item aqui limitada em duas linhas...</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-500">Lara</span>
                {!isAuthenticated ? (
                  <p className="text-xs text-gray-500">Entre para ofertar</p>
                ) : (
                  <button className="bg-rose-300 text-white px-2 py-1 text-sm rounded">Fazer proposta</button>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
  </>;
}