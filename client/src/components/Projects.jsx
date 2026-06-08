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
import Projeto_ReactGram from "../assets/img/Projeto_ReactGram.png";
import Projeto_SocialMedia from "../assets/img/Projeto_SocialMedia.png";

const projects = [
  {
    title: "Agency Travel Fly",
    imgUrl: Site_AgencyTravel,
    description:
      "Travel Agency Website é uma aplicação institucional desenvolvida para gestão de contatos e consultoria de passagens aéreas. A plataforma é voltada para captação de clientes e solicitação de orçamentos personalizados, oferecendo uma experiência simples e eficiente para comunicação com a agência.",
    githubUrl:
      "https://github.com/WeidsonCordeiro/Site_Oficial_Agency_Travel.git",
    deployUrl: "https://agencytravelfly.netlify.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Rocharte Investimentos Imobiliarios",
    imgUrl: Site_RocharteInvestimentos,
    description:
      "Rocharte Investimentos Imobiliários é uma aplicação full-stack desenvolvida para captação de clientes e gestão de contatos. Integra a API de e-mail Mailjet para envio de mensagens e newsletters, oferecendo uma experiência eficiente para geração de leads e solicitação de orçamentos personalizados.",
    githubUrl:
      "https://github.com/WeidsonCordeiro/Site_Oficial_Rochart_Investimentos.git",
    deployUrl: "https://rochartinvestimentos.vercel.app/",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js"],
  },
  {
    title: "Lista de Filmes",
    imgUrl: Site_ListaFilmes,
    description:
      "MovieList é uma aplicação full-stack que consome a API do The Movie Database (TMDb) para exibir, buscar e visualizar detalhes de filmes. Desenvolvida com foco em performance e experiência do usuário, a aplicação oferece navegação dinâmica, listagem atualizada e interface intuitiva.",
    githubUrl: "https://github.com/WeidsonCordeiro/Lista_de_Filmes.git",
    deployUrl: "https://movieslib-delta.vercel.app/",
    technologies: ["React", "CSS", "Node.js", "TMDb"],
  },
  {
    title: "Mini Blog",
    imgUrl: Projeto_MiniBlog,
    description:
      "MiniBlog é uma aplicação full-stack de blog desenvolvida com React e Firebase. Utiliza Firebase Authentication para autenticação de usuários e Firestore para persistência de dados. O gerenciamento de estado global é feito com Context API, oferecendo funcionalidades completas de CRUD de posts, navegação dinâmica e experiência fluida no frontend.",
    githubUrl: "https://github.com/WeidsonCordeiro/MiniBlog.git",
    deployUrl: "https://miniblog-lake-eight.vercel.app/",
    technologies: ["React", "CSS", "Node.js", "Firebase", "Cloudinary"],
  },
  {
    title: "Projeto ReactGram",
    imgUrl: Projeto_ReactGram,
    description:
      "ReactGram é uma aplicação full-stack inspirada no Instagram, construída com React (Vite), Redux Toolkit e Node.js/Express. Utiliza MongoDB para persistência de dados e JWT para autenticação segura com logout automático. Inclui upload de imagens com Cloudinary, CRUD de posts, sistema de likes e comentários, feed dinâmico e gerenciamento de perfil de usuário.",
    githubUrl: "https://github.com/WeidsonCordeiro/Projeto_ReactGram.git",
    deployUrl: "https://reactgram-blond.vercel.app",
    technologies: ["React", "CSS", "MongoDB", "Node.js"],
  },
  {
    title: "Projeto Social Media",
    imgUrl: Projeto_SocialMedia,
    description:
      "ReactGram é uma aplicação full-stack inspirada em redes sociais, desenvolvida com React (Vite) e Node.js/Express. Utiliza MongoDB e JWT para autenticação segura. Possui upload de imagens, CRUD completo de posts (criação, edição e exclusão), sistema de likes e comentários, feed dinâmico, gerenciamento de perfil e status online em tempo real com Socket.io",
    githubUrl: "https://github.com/WeidsonCordeiro/Projeto_Social_Media.git",
    deployUrl: "#",
    technologies: [
      "React",
      "CSS",
      "MongoDB",
      "Node.js",
      "cloudinary",
      "Socket.io",
    ],
  },
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
            className="position-absolute w-100 rounded cards-front-custom box-shadow-custom"
          >
            <div>
              <img src={project.imgUrl} alt={project.title} className="w-100" />
            </div>
            <div className="bottom-0 start-0 p-4">
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

            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="col transition-custom"
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
