// Home.jsx
import { useAuth } from "../context/AuthContext";
import {
  Search,
  Smile,
  Tag,
  ListFilter,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ModalProposta from "../components/ModalProposta"; 
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const handleCadastroClick = () => navigate("/registro");

  const [carregando, setCarregando] = useState(true);
  const [itens, setItens] = useState([]);
  const [quantidadeAtivos, setQuantidadeAtivos] = useState(0);
  const [meusItens, setMeusItens] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [itemDesejadoSelecionado, setItemDesejadoSelecionado] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFazerProposta = (item) => {
    setItemDesejadoSelecionado(item);
    setModalVisivel(true);
  };

  const handleEnviarProposta = async (proposta) => {
    if (!user || !user.cpf) {
      console.error("Usuário não logado ou CPF não disponível.");
      toast.error("Você precisa estar logado para enviar propostas.");
      return;
    }

    const itemDesejado = itens.find((item) => item.id_item === proposta.item_desejado);
    const itemOfertado = meusItens.find((item) => item.id_item === proposta.item_ofertado);

    if (!itemDesejado || itemDesejado.status_item !== true) {
      toast.error("O item desejado não está disponível para troca.");
      return;
    }

    if (!itemOfertado || itemOfertado.status_item !== false) {
      toast.error("O seu item ofertado não está disponível para troca.");
      return;
    }

    const payload = {
      cpf_proponente: user.cpf,
      item_ofertado: Number(proposta.item_ofertado),
      item_desejado: Number(proposta.item_desejado),
      cpf_dono_item: proposta.cpf_dono_item,
      status_proposta: "pendente",
    };

    console.log("Enviando proposta:", payload);

    try {
      const res = await fetch(`${API_URL}/propostas`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro ao enviar proposta: ${res.status} - ${errorText}`);
      }

      toast.success("Proposta enviada com sucesso!");
      setModalVisivel(false);
    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      toast.error("Erro ao enviar proposta: Item próprio!");
    }
  };

  useEffect(() => {
    const fetchMeusItens = async () => {
      try {
        const res = await fetch(`${API_URL}/itens/meus-itens`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Erro ao buscar itens: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        const itensFiltrados = data.filter((item) => item.cpf_dono === user?.cpf && item.status_item === false);
        setMeusItens(itensFiltrados);
      } catch (err) {
        console.error("Erro ao buscar meus itens:", err);
      }
    };

    if (user && user.cpf) {
      fetchMeusItens();
    }
  }, [user]); // A dependência deve ser 'usuario' inteiro para reagir a mudanças no objeto.

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const [ativosRes, quantidadeRes] = await Promise.all([
          fetch(`${API_URL}/itens/ativos`, { credentials: "include" }),
          fetch(`${API_URL}/itens/ativos/quantidade`),
        ]);

        if (!ativosRes.ok || !quantidadeRes.ok) throw new Error("Erro ao buscar dados");

        const ativosData = await ativosRes.json();
        const quantidadeData = await quantidadeRes.json();

        setItens(ativosData);
        setQuantidadeAtivos(quantidadeData.quantidade);
      } catch (err) {
        console.error(err.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchItens();
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas as categorias");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12;

  const filteredItens = itens.filter((item) => {
    const matchesSearch = [item.nome, item.descricao].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    );
    const matchesFilter =
      filter === "" ||
      filter === "Todas as categorias" ||
      item.categoria?.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const totalPaginas = Math.ceil(filteredItens.length / itensPorPagina);
  const itensPaginados = filteredItens.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-lg animate-pulse">
      <div className="bg-gray-300 w-full h-[283px] rounded-t-lg"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-full bg-gray-300 rounded-sm"></div>
          <div className="h-8 w-full bg-gray-300 rounded-sm"></div>
        </div>
      </div>
    </div>
    );

  return (
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
      <h3 className="text-2xl font-semibold mb-6 text-[#B06D6D]">Itens disponíveis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {carregando
          ? [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
          : itensPaginados.map((item) => (
              <div key={item.id_item} className="bg-white rounded-lg shadow-lg flex flex-col">
                <div>
                  <img
                    src={item.imagem || "https://via.placeholder.com/150"}
                    alt={item.nome}
                    className="bg-gray-200 w-full rounded-t-lg object-cover mb-3 h-[283px]"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-[#B06D6D] text-sm">{item.nome}</h4>
                      <div className="flex flex-row gap-1 bg-gray-100 px-2 py-0.5 rounded items-center">
                        <Tag className="w-2.5 h-2.5 stroke-[#4E4E4E]" />
                        <span className="text-xs text-[#4E4E4E]">{item.categoria || "Categoria"}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#1E1E1E] mb-3">{item.descricao}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-row gap-1 items-center">
                        <Smile className="w-4 h-4 stroke-[#4E4E4E]" />
                        <span className="text-xs text-[#4E4E4E]">{item.donoItem?.nome || "Anônimo"}</span>
                      </div>
                      {!isAuthenticated ? (
                        <p className="text-xs text-[#4E4E4E]">Entre para ofertar</p>
                      ) : (
                        <button
                          onClick={() => handleFazerProposta(item)}
                          className="bg-[#B06D6D] text-white p-2 text-xs rounded hover:bg-[#a05c5c] transition"
                        >
                          Fazer proposta
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
        {!carregando && totalPaginas > 1 && (
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
              className="px-4 py-2 disabled:opacity-50 cursor-pointer"
            >
              <CircleChevronLeft className="text-[#4E4E4E] " />
            </button>

            <span className="text-xs text-[#4E4E4E]">
              Página {paginaAtual} de {totalPaginas}
            </span>

            <button
              onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className="px-4 py-2 disabled:opacity-50 cursor-pointer"
            >
              <CircleChevronRight className="text-[#4E4E4E] " />
            </button>
          </div>
        )}
      </section>

      <Footer />

      <ModalProposta
        visivel={modalVisivel}
        onCancelar={() => setModalVisivel(false)}
        onConfirmar={handleEnviarProposta}
        itensDisponiveis={meusItens}
        itemDesejadoId={itemDesejadoSelecionado?.id_item}
        donoItemCpf={itemDesejadoSelecionado?.cpf_dono}
      />
    </div>
    );
}
