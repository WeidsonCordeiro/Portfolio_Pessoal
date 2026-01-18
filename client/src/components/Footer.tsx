import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-black/50 backdrop-blur-md mt-10">
      <div className="container mx-auto text-center text-space-light text-sm pt-4 pb-8">
        <motion.p
          className="font-orbitron text-xs mb-3"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Obrigado por visitar meu portfólio! Sinta-se à vontade para entrar em
          contato.
        </motion.p>

        <p className="mb-2 text-space-purple">
          ©️ 2026 – Criado por Weidson Alves Cordeiro | Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
