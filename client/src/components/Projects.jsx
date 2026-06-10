//React Hooks
import { useState } from "react";

//Components
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal/ProjectModal";

//Framer Motion for animations
import { motion } from "framer-motion";

//Projects data
import { projects } from "../data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="container py-5">
        <motion.h2
          className="display-5 fw-bold mb-5 text-center transition-custom"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Projetos
        </motion.h2>

        <div className="row g-4">
          {projects.map((project) => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <ProjectCard project={project} onOpen={setSelectedProject} />
            </div>
          ))}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
