//Hooks
import { useState } from "react";

//Animations
import { motion, AnimatePresence } from "framer-motion";
import { InView } from "react-intersection-observer";

//Icons
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Neon Snake Game",
    imgUrl: "/imagen/snake.png",
    description:
      'Jogo clássico da cobrinha (Snake) com visual "Neon", power-ups e placar, feito em HTML, CSS e JavaScript puro.',
    githubUrl: "https://github.com/Anderson-full/neonsnake",
    deployUrl: "https://anderson-full.github.io/NeonSnake/",
    technologies: ["JavaScript", "HTML", "CSS", "Canvas"],
  },
  {
    title: "Portfólio Galáxia (Este Site)",
    imgUrl: "/imagen/portfolio-galaxia.png",
    description:
      "Meu portfólio interativo com tema espacial, construído com React, Three.js (fundo) e Framer Motion.",
    githubUrl: "https://github.com/andersondsbezerra/Portfolio",
    deployUrl: "#",
    technologies: ["React", "Three.js", "Framer Motion", "Bootstrap"],
  },
  {
    title: "Max Motos",
    imgUrl: "/imagen/max-motos.png",
    description:
      "E-commerce de venda de motos (Full Stack) com Node.js, Prisma e React.",
    githubUrl: "https://github.com/Anderson-full/max-motos",
    deployUrl: "https://max-moto.netlify.app/",
    technologies: ["React", "Node.js", "Prisma", "Bootstrap"],
  },
  {
    title: "Red Bike",
    imgUrl: "/imagen/red-bike.png",
    description:
      "Projeto de landing page para aluguel de bicicletas, focado em design com HTML, CSS e JavaScript puro.",
    githubUrl: "https://github.com/Anderson-full/Red-Bike",
    deployUrl: "https://anderson-full.github.io/Red-Bike/",
    technologies: ["HTML", "CSS", "JavaScript"],
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
            className="position-absolute w-100 h-100 rounded"
            style={{
              overflow: "hidden",
              boxShadow: "rgba(107, 33, 168, 0.5) 0px 0px 30px",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={project.imgUrl}
              alt={project.title}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
            <div
              className="position-absolute bottom-0 start-0 w-100 p-3"
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="font-orbitron text-white mb-0">{project.title}</h3>
            </div>
          </motion.div>
        )}

        {isFlipped && (
          <motion.div
            key="verso"
            className="position-absolute w-100 h-100 rounded p-4 d-flex flex-column"
            style={{
              backgroundColor: "#1e1e3f",
              overflowY: "auto",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex-grow-1">
              <h3 className="font-orbitron fw-bold mb-2">{project.title}</h3>
              <p className="small text-space-light mb-3">
                {project.description}
              </p>

              <div className="d-flex flex-wrap gap-2 my-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-space-dark text-space-light px-2 py-1 rounded-pill"
                    style={{ fontSize: "0.75rem" }}
                  >
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
                className="text-space-light"
                style={{ fontSize: "1.5rem", textDecoration: "none" }}
                onClick={handleLinkClick}
              >
                <FaGithub />
              </a>
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-space-light"
                style={{ fontSize: "1.5rem", textDecoration: "none" }}
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
              className="display-5 font-orbitron fw-bold mb-5 text-center transition-custom"
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
