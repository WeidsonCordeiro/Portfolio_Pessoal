//Hooks
import { useState } from "react";

//Animations
import { motion, AnimatePresence } from "framer-motion";
import { InView } from "react-intersection-observer";

//Icons
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

//Images
import Site_AgencyTravel from "../assets/img/Site_AgencyTravel.png";
import Site_RocharteInvestimentos from "../assets/img/Site_Rocharte_investimentos.png";
import Site_ListaFilmes from "../assets/img/Site_ListaFilmes.png";
import Projeto_MiniBlog from "../assets/img/Projeto_MiniBlog.png";
//import Projeto_ReactGram from "../assets/img/Projeto_ReactGram.png";

const projects = [
  {
    title: "Site Agency Travel Fly",
    imgUrl: Site_AgencyTravel,
    description:
      "Site institucional de agência de viagens - Aplicação Full Stack com integração de API de email (Mailjet) para gestão de contato e consultoria de passagens aéreas. Desenvolvido para captação de clientes e orçamentos personalizados.",
    githubUrl:
      "https://github.com/WeidsonCordeiro/Site_Oficial_Agency_Travel.git",
    deployUrl: "https://agencytravelfly.netlify.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Site Rocharte Investimentos Imobiliarios",
    imgUrl: Site_RocharteInvestimentos,
    description:
      "Site Rocharte Investimentos Imobiliarios - Aplicação Full Stack com integração de API de email (Mailjet) para gestão de contatos e newsletter. Desenvolvido para captação de clientes e orçamentos personalizados.",
    githubUrl:
      "https://github.com/WeidsonCordeiro/Site_Oficial_Rochart_Investimentos.git",
    deployUrl: "https://rochartinvestimentos.vercel.app/",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js"],
  },
  {
    title: "Site Lista de Filmes",
    imgUrl: Site_ListaFilmes,
    description:
      "Site Lista de Filmes - Este projeto é uma aplicação React que consome a API do The Movie Database (TMDb) para exibir uma lista de filmes, permitindo busca e visualização de detalhes dos filmes.",
    githubUrl: "https://github.com/WeidsonCordeiro/Lista_de_Filmes.git",
    deployUrl: "https://movieslib-delta.vercel.app/",
    technologies: ["React", "CSS", "TMDb", "Node.js"],
  },
  {
    title: "Projeto Mini Blog",
    imgUrl: Projeto_MiniBlog,
    description:
      "Projeto Mini Blog - Mini Blog - React + Firebase | Context API Aplicação full-stack de blog desenvolvida com React.js e Firebase como backend. Implementa autenticação de usuários com Firebase Auth, armazenamento de dados no Firestore Database, e gerenciamento de estado global usando React Context API. Funcionalidades completas de CRUD para postagens com interface responsiva.",
    githubUrl: "https://github.com/WeidsonCordeiro/MiniBlog.git",
    deployUrl: "#",
    technologies: ["React", "CSS", "Firebase", "Node.js"],
  },
  // {
  //   title: "Projeto ReactGram",
  //   imgUrl: Projeto_ReactGram,
  //   description:
  //     "Projeto ReactGram - Instagram Clone | React + Redux + MongoDB Aplicação full-stack replicando funcionalidades do Instagram. Desenvolvida com React.js, Redux para gerenciamento de estado global, e Node.js/Express no backend com MongoDB. Features: sistema completo de autenticação, upload de imagens com preview, CRUD de posts, like/comentários, feed personalizado e perfil de usuário com interface responsiva.",
  //   githubUrl: "#",
  //   deployUrl: "#",
  //   technologies: ["React", "CSS", "MongoDB", "Node.js"],
  // },
];

const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="position-relative cursor-pointer"
      style={{ height: "300px", cursor: "pointer" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <AnimatePresence initial={false}>
        {!isFlipped && (
          <motion.div
            key="frente"
            className="position-absolute w-100 h-100 rounded cards-front-custom box-shadow-custom"
          >
            <img
              src={project.imgUrl}
              alt={project.title}
              className="w-100 h-100"
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-3">
              <h3 className="text-white mb-0 fs-5">{project.title}</h3>
            </div>
          </motion.div>
        )}

        {isFlipped && (
          <motion.div
            key="verso"
            className="position-absolute w-100 h-100 rounded p-3 d-flex flex-column cards-back-custom"
          >
            <div className="flex-grow-1">
              <h3 className="fw-bold mb-2 fs-4">{project.title}</h3>
              <p className="mb-3 small">{project.description}</p>

              <div className="d-flex flex-wrap gap-2 my-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className=""
                onClick={handleLinkClick}
              >
                <FaGithub />
              </a>
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className=""
                onClick={handleLinkClick}
              >
                <FaExternalLinkAlt />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid px-3 py-4"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-100">
            <motion.h2
              className="display-5 fw-bold mb-5 text-center transition-custom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Projetos
            </motion.h2>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="col transition-custom"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </InView>
    </section>
  );
};

export default Projects;
