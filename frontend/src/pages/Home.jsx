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
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ModalProposta from "../components/ModalProposta"; // ✅ IMPORTADO
import axios from "axios";


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

  // Relacionados à proposta

   const handleFazerProposta = (item) => {
    setItemDesejadoSelecionado(item);
    setModalVisivel(true);
  };

  // Função para enviar proposta

    const handleEnviarProposta = async (proposta) => {
    if (!user || !user.cpf) {
      console.error("Usuário não logado ou CPF não disponível.");
      alert("Você precisa estar logado para enviar propostas.");
      return;
    }

    const payload = {
      cpf_proponente: user.cpf,
      ...proposta,
      status_proposta: "pendente",
    };

    try {
      const res = await fetch("http://localhost:3000/propostas", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao enviar proposta");

      alert("Proposta enviada com sucesso!");
      setModalVisivel(false);
    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      alert("Erro ao enviar proposta.");
    }
  };

   useEffect(() => {
      const fetchMeusItens = async () => {
        try {
          const res = await fetch("http://localhost:3000/itens/meus-itens", {
            method: "GET",
            credentials: "include", // importante para enviar cookies
          });

          if (!res.ok) {
            // Logar o status e a mensagem de erro da resposta
            const errorText = await res.text();
            throw new Error(`Erro ao buscar itens: ${res.status} - ${errorText}`);
          }

          const data = await res.json();
          console.log("Dados brutos da API para 'meus-itens':", data); // NOVO LOG AQUI

          // Filtra os itens apenas do usuário logado
          const itensFiltrados = data.filter(item => {
            const isOwner = item.cpf_dono === user?.cpf; // AQUI ESTÁ A COMPARAÇÃO CRÍTICA
            console.log(`Comparando: Item CPF_DONO=${item.cpf_dono} com USUARIO CPF=${user?.cpf}. Resultado: ${isOwner}`); // NOVO LOG AQUI PARA DEBUG DA COMPARAÇÃO
            return isOwner;
          });

          setMeusItens(itensFiltrados);
          console.log("Meus itens filtrados:", itensFiltrados); // NOVO LOG AQUI PARA VER O RESULTADO FINAL
        } catch (err) {
          console.error("Erro ao buscar meus itens:", err);
        }
      };

      // Garante que 'usuario' e 'usuario.cpf' existem antes de tentar buscar os itens
      if (user && user.cpf) {
        console.log("Usuário logado com CPF:", user.cpf); // NOVO LOG
        fetchMeusItens();
      } else {
        console.log("Usuário não logado ou CPF não disponível ainda."); // NOVO LOG
      }
  }, [user]); // A dependência deve ser 'usuario' inteiro para reagir a mudanças no objeto.

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const [ativosRes, quantidadeRes] = await Promise.all([
          fetch("http://localhost:3000/itens/ativos", { credentials: "include" }),
          fetch("http://localhost:3000/itens/ativos/quantidade"),
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
    <>
      {/* ... hero, busca, filtros, estatísticas ... */}

      {/* Cards de itens */}
      <section className="px-4 md:px-30 py-6 flex-1">
        <h3 className="text-xl font-semibold mb-4 text-[#B06D6D]">Itens disponíveis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {carregando
            ? [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
            : itensPaginados.map((item) => (
                <div key={item.id_item} className="bg-white rounded-lg shadow-lg flex flex-col">
                  <img
                    src={item.imagem || "https://via.placeholder.com/150"}
                    alt={item.nome}
                    className="bg-gray-200 w-full rounded-t-lg object-cover mb-3 h-[283px]"
                  />
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
                    </div>
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
                          className="bg-[#B06D6D] text-white p-2 text-xs rounded hover:bg-[#944f4f] transition"
                        >
                          Fazer proposta
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Modal Proposta */}
      <ModalProposta
        visivel={modalVisivel}
        onCancelar={() => setModalVisivel(false)}
        onConfirmar={handleEnviarProposta}
        itensDisponiveis={meusItens}
        itemDesejadoId={itemDesejadoSelecionado?.id_item}
        donoItemCpf={itemDesejadoSelecionado?.cpf_dono}
      />

      <Footer />
    </>
  );
}
