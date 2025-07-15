import { HeartOff } from "lucide-react";
//import { useAuth } from '../context/AuthContext';
import { useAuth } from "../context/AuthContext";
// src/pages/Home.jsx
export default function Home() {
    const { isAuthenticated } = useAuth();

  return <>
    <section className="h-80 w-full bg-[#B06D6D]">
        <div className="flex flex-col items-center justify-center py-10 text-white text-center gap-8">
            <h1 className="text-5xl font-bold">Negocie. Troque. Descubra.</h1>
            <p className="">Junte-se ao nosso mercado impulsionado pela comunidade, <br />onde cada item tem o potencial de uma nova história</p>
            {!isAuthenticated && (
            <button className="font-semibold rounded-md border border-white w-50 h-12 hover:bg-white hover:text-[#B06D6D] cursor-pointer">Cadastre-se</button>
            )}
        </div>
    </section>

    <section className=" h-20 w-full bg-white drop-shadow-xl">
        <div className="flex flex-row justify-center items-center gap-8 py-4 px-6 md:px-30">
            <input type="text" placeholder="Buscar Itens" className="border border-[#8D8D8D] text-[#8D8D8D] rounded-md w-lg px-4 py-1.5"/>
            <input type="text" placeholder="Todas as categorias" className="border border-[#8D8D8D] text-[#8D8D8D] rounded-md w-lg px-4 py-1.5"/>
        </div>

    </section>
  </>;
}