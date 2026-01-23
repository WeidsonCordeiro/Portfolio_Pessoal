//Animation
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer
      className="w-100 p-3 mt-5"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="container-fluid text-center"
        style={{
          fontSize: "0.9rem",
          paddingTop: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <motion.p
          className="mb-3"
          style={{ fontSize: "0.85rem" }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Obrigado por visitar meu portfólio! Sinta-se à vontade para entrar em
          contato.
        </motion.p>

        <p style={{ color: "#6b21a8" }}>
          ©️ 2026 – Criado por Weidson Alves Cordeiro | Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
