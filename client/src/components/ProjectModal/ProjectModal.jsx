import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./ProjectModal.module.css";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = "project-modal-title";

  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = [
        ...modalRef.current.querySelectorAll(FOCUSABLE),
      ].filter((el) => !el.hasAttribute("disabled"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const linksDisabled = project.linksPending || project.github === "#";

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {project.title}
          </h2>

          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className={styles.closeButton}
            aria-label={t("projects.closeModal")}
          >
            <IoClose size={24} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.content}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />

          <p className={styles.description}>{project.description}</p>

          <h3 className={styles.sectionTitle}>{t("projects.modalTech")}</h3>

          <div className={styles.techs}>
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <h3 className={styles.sectionTitle}>{t("projects.modalFeatures")}</h3>

          <ul className={styles.featureList}>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <footer className={styles.footer}>
          {linksDisabled ? (
            <>
              <span className={styles.pendingLink}>{t("projects.githubSoon")}</span>
              <span className={styles.pendingLink}>{t("projects.demoSoon")}</span>
            </>
          ) : (
            <>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                <FaGithub aria-hidden="true" />
                <span>{t("projects.github")}</span>
              </a>

              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                <FaExternalLinkAlt aria-hidden="true" />
                <span>{t("projects.demo")}</span>
              </a>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
