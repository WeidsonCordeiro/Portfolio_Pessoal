import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { InView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'; 
import React from 'react'; 

const projects = [
  {
    title: 'Neon Snake Game',
    imgUrl: '/imagen/snake.png', 
    description: 'Jogo clássico da cobrinha (Snake) com visual "Neon", power-ups e placar, feito em HTML, CSS e JavaScript puro.',
    githubUrl: 'https://github.com/Anderson-full/neonsnake', 
    deployUrl: 'https://anderson-full.github.io/NeonSnake/',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Canvas']
  },
  {
    title: 'Portfólio Galáxia (Este Site)',
    imgUrl: '/imagen/portfolio-galaxia.png', 
    description: 'Meu portfólio interativo com tema espacial, construído com React, Three.js (fundo) e Framer Motion.',
    githubUrl: 'https://github.com/andersondsbezerra/Portfolio', 
    deployUrl: '#', 
    technologies: ['React', 'Three.js', 'Framer Motion', 'TailwindCSS']
  },
  {
    title: 'Max Motos',
    imgUrl: '/imagen/max-motos.png', 
    description: 'E-commerce de venda de motos (Full Stack) com Node.js, Prisma e React.',
    githubUrl: 'https://github.com/Anderson-full/max-motos', 
    deployUrl: 'https://max-moto.netlify.app/', 
    technologies: ['React', 'Node.js', 'Prisma', 'TailwindCSS']
  },
  {
    title: 'Red Bike',
    imgUrl: '/imagen/red-bike.png', 
    description: 'Projeto de landing page para aluguel de bicicletas, focado em design com HTML, CSS e JavaScript puro.',
    githubUrl: 'https://github.com/Anderson-full/Red-Bike', 
    deployUrl: 'https://anderson-full.github.io/Red-Bike/', 
    technologies: ['HTML', 'CSS', 'JavaScript']
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
  };

  return (
    <div 
      className="w-full h-64 cursor-pointer relative"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <AnimatePresence initial={false}>
        {!isFlipped && (
          <motion.div 
            key="frente"
            className="absolute w-full h-full rounded-lg overflow-hidden shadow-lg shadow-space-purple/50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.4 }}
          >
            <img src={project.imgUrl} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60 backdrop-blur-sm">
              <h3 className="font-orbitron text-white text-lg font-bold">{project.title}</h3>
            </div>
          </motion.div>
        )}

        {isFlipped && (
          <motion.div 
            key="verso"
            className="absolute w-full h-full bg-space-blue rounded-lg p-4 flex flex-col h-full overflow-y-auto"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex-grow">
              <h3 className="font-orbitron text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-space-light mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 my-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-space-dark text-xs font-exo text-space-light px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 flex justify-end space-x-4 pt-2">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-space-light hover:text-space-purple text-2xl transition-colors z-10" 
                onClick={handleLinkClick} 
              >
                <FaGithub />
              </a>
              <a 
                href={project.deployUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-space-light hover:text-space-purple text-2xl transition-colors z-10" 
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
      className="min-h-screen flex items-center justify-center container mx-auto px-4 py-16"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-full">
            <motion.h2 
              className="text-4xl font-orbitron font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Projetos
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
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