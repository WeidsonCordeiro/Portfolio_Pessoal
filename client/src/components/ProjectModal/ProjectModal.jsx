//React Icons
import { IoClose } from "react-icons/io5";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

//Css
import styles from "./ProjectModal.module.css";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className="text-secondary-emphasis">{project.title}</h2>

          <button onClick={onClose} className={styles.closeButton}>
            <IoClose size={24} />
          </button>
        </header>

        <div className={styles.content}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.image}
          />

          <p className="text-secondary-emphasis">{project.description}</p>

          <h4 className="text-secondary-emphasis">
            <strong>Technologies</strong>
          </h4>

          <div className={styles.techs}>
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <h4 className="text-secondary-emphasis">
            <strong>Features</strong>
          </h4>

          <ul>
            {project.features.map((feature) => (
              <li className="text-secondary-emphasis" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <footer className={styles.footer}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary d-flex align-items-center justify-content-center"
          >
            <FaGithub />
            <span className="ms-1">GitHub</span>
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary d-flex align-items-center justify-content-center"
          >
            <FaExternalLinkAlt />
            <span className="ms-1">Live Demo</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
