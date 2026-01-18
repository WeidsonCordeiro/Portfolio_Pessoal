// frontend/src/components/Header.tsx

import { motion } from 'framer-motion';
import React from 'react';

// Componente interno para os links (garante que não quebrem linha e usa font-exo)
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="px-3 py-2 rounded-md 
               text-base font-semibold font-exo text-space-light 
               hover:text-white hover:bg-space-blue/50 transition-all duration-300
               whitespace-nowrap"
  >
    {children}
  </a>
);

const Header = () => {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Quem Sou Eu', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Currículo', href: '#resume' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    // Aplica fundo transparente, blur e posicionamento fixo
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 p-4 bg-black/50 backdrop-blur-md" 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* --- Logo (Usa font-orbitron para destaque e evita quebra) --- */}
        <a 
          href="#home" 
          className="text-lg md:text-xl font-bold font-orbitron text-white shadow-galaxy-glow
                     whitespace-nowrap flex-shrink-0"
        >
          Anderson de Souza Bezerra
        </a>

        {/* --- Menu (Aparece a partir de telas médias e evita quebra) --- */}
        <div className="hidden md:flex space-x-4 items-center"> 
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;