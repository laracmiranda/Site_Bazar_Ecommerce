import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#B06D6D] text-white px-6 md:px-30 py-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Branding e descrição */}
        <div className="flex flex-col gap-4 max-w-md">
          <div className="flex items-center gap-2">
              <img src="./icons/logo.svg" alt="Logo" className='w-10 h-10 md:w-12'/>
            <h2 className="text-white text-lg font-bold">bazar.</h2>
          </div>
          <p className="text-sm text-white/90">
            Uma plataforma comunitária onde você pode trocar itens que não precisa mais por coisas que deseja.
            Junte-se à milhares de usuários em nosso mercado sustentável.
          </p>
          <div className="flex gap-3">
            <a href="#"><i className="fab fa-instagram text-white/80"></i></a>
            <a href="#"><i className="fab fa-twitter text-white/80"></i></a>
          </div>
        </div>

        {/* Links rápidos */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold">Links rápidos</h3>
          <a href="#" className="text-sm text-white/90 hover:underline">Início</a>
          <a href="#" className="text-sm text-white/90 hover:underline">Cadastre-se</a>
          <a href="#" className="text-sm text-white/90 hover:underline">FAQ</a>
        </div>

        {/* Contato */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold">Contate-nos</h3>
          <div className='flex gap-1 items-center'>
            <Mail size={15}/>
            <p className="text-sm text-white/90">support@bazar.com</p>
          </div>
          <div className='flex gap-1 items-center'>
            <Phone size={15}/>
            <p className="text-sm text-white/90"> +55 (99) 9999-3456</p>
          </div>
        </div>
      </div>

      {/* Linha divisória */}
      <hr className="my-6 border-white/20" />

      {/* Rodapé */}
      <div className="flex flex-col md:flex-row justify-between text-xs text-white/80 gap-2">
        <p>© 2025 bazar, Todos os direitos reservados</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Política de Privacidade</a>
          <a href="#" className="hover:underline">Termos de Serviço</a>
          <a href="#" className="hover:underline">Política de Cookies</a>
        </div>
      </div>
    </footer>
  );
}