import { useAuth } from "../context/AuthContext";
import { Search, Smile, Tag, ListFilter} from 'lucide-react';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


export default function Home() {
    const { isAuthenticated } = useAuth();
    
    const navigate = useNavigate();
    const handleCadastroClick = () => {
      navigate("/registro");
    };

    const [itens, setItens] = useState([]);
    const [quantidadeAtivos, setQuantidadeAtivos] = useState(0);

    useEffect(() => {
    // Buscar os itens ativos
    fetch("http://localhost:3000/itens/ativos")
      .then((res) => res.json())
      .then((data) => setItens(data))
      .catch((err) => console.error("Erro ao buscar itens ativos:", err));

    // Buscar a quantidade de itens ativos
    fetch("http://localhost:3000/itens/ativos/quantidade")
      .then((res) => res.json())
      .then((data) => setQuantidadeAtivos(data.quantidade))
      .catch((err) => console.error("Erro ao buscar contagem:", err));
    }, []);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Todas as categorias");
    const filteredItens = itens.filter((itens) => {
      const matchesSearch = [itens.nome, itens.descricao].some(field =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
      const matchesFilter = filter === "" || filter === "Todas as categorias" || itens.categoria?.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
    });

  return <>
    <div>
    <section className="w-full bg-[#B06D6D] min-h-[20rem] flex items-center justify-center px-4 py-12">
        
        <div className="flex flex-col items-center justify-center text-white text-center gap-6 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Negocie. Troque. Descubra.</h1>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-10">Junte-se ao nosso mercado impulsionado pela comunidade, <br />onde cada item tem o potencial de uma nova história</p>
            
            {!isAuthenticated ? (
            <button onClick={handleCadastroClick} className="font-semibold rounded-md border border-white px-6 py-3 text-sm sm:text-base hover:bg-white hover:text-[#B06D6D] transition-colors cursor-pointer">
              Cadastre-se
            </button>
            ) : (
                <video autoPlay loop muted playsInline width="70" height="70">
                 <source src="/animations/arrow-down.webm" type="video/webm" />
                  Seu navegador não suporta vídeos em .webm
                </video>
            )}
        </div>
    </section>

    {/* Busca e filtro */}
    <section className="bg-white py-4 px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 shadow justify-center">
        <div className="flex items-center border border-[#949090] rounded w-full md:w-1/2 px-3 py-2">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input className="w-full outline-none" placeholder="Buscar Itens" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center border border-[#949090] rounded w-full md:w-1/4 px-3 py-2">
            <ListFilter className="w-4 h-4 text-gray-500 mr-2"/>
            <select className="w-full outline-none text-gray-500" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option>Todas as categorias</option>
                <option>Moda</option>
                <option>Eletrônicos</option>
                <option>Livros</option>
                <option>Casa</option>
                <option>Celulares</option>
                <option>Outros</option>
            </select>
        </div>
    </section>
    
    {/* Estatísticas */}
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center p-4 md:px-30 ">
        <div className="bg-white shadow rounded p-4">
          <p className="text-2xl font-bold text-[#949090]">{quantidadeAtivos}</p>
          <p className="text-gray-500">Itens disponíveis</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-[#949090]">
          <p className="text-2xl font-bold">823</p>
          <p className="text-gray-500">Usuários felizes</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-[#949090]">
          <p className="text-2xl font-bold">1200</p>
          <p className="text-gray-500">Trocas realizadas</p>
        </div>
    </section>

    {/* Lista de Itens */}
      <section className="px-4 md:px-30 py-6 flex-1">
        <h3 className="text-xl font-semibold mb-4 text-[#B06D6D]">Itens disponíveis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {filteredItens.map((item) => (
            <div key={item.id_item} className="bg-white rounded-lg shadow-lg flex flex-col">
              <div>
                <img
                src={item.imagem || "https://via.placeholder.com/150"}
                alt={item.nome}
                className="bg-gray-200 w-full rounded-t-lg object-cover mb-3 h-[283px]"
                />
              </div>
              <div className="p-4">
                <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-[#B06D6D] text-sm">{item.nome}</h4>
                  <div className="flex flex-row gap-1 bg-gray-100 px-2 py-0.5 rounded items-center">
                  <Tag className="w-2.5 h-2.5 stroke-[#4E4E4E]"/> 
                  <span className="text-xs text-[#4E4E4E]">{item.categoria || "Categoria"}</span>
                  </div>
                </div>
                <p className="text-sm text-[#1E1E1E] mb-3">{item.descricao}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-row gap-1 items-center">
                  <Smile className="w-4 h-4 stroke-[#4E4E4E]"/>
                  <span className="text-xs text-[#4E4E4E]">{item.donoItem?.nome || "Anônimo"}</span>
                </div>
                {!isAuthenticated ? (
                  <p className="text-xs text-[#4E4E4E]">Entre para ofertar</p>
                ) : (
                  <button className="bg-[#B06D6D] text-white p-2 text-xs rounded">Fazer proposta</button>
                )}
                
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
      <Footer/>
  </>;
}