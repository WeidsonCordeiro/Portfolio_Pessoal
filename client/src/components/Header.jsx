//Hooks
import React from "react";

//Animation
import { motion } from "framer-motion";

const NavLink = ({ href, children }) => (
  <a href={href} className="nav-link fw-semibold text-white box-shadow-custom">
    {children}
  </a>
);

const Header = () => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Quem Sou Eu", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Projetos", href: "#projects" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <motion.nav
      className="navbar navbar-expand-md fixed-top navbar-custom"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container-fluid">
        <a
          href="#home"
          className="navbar-brand fw-bold text-white box-shadow-custom p-2 navbar-custom-logo"
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
