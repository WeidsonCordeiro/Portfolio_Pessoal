import { motion } from "framer-motion";
import React from "react";

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="nav-link fw-semibold font-exo text-space-light"
    style={{
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </a>
);

const Header = () => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Quem Sou Eu", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Projetos", href: "#projects" },
    { name: "Currículo", href: "#resume" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <motion.nav
      className="navbar navbar-expand-md fixed-top"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        zIndex: 50,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-fluid">
        <a
          href="#home"
          className="navbar-brand fw-bold font-orbitron text-white"
          style={{ whiteSpace: "nowrap", textDecoration: "none" }}
        >
          Weidson Cordeiro
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
