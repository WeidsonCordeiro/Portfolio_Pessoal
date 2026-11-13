import { useTranslation } from "react-i18next";

export default function ProjectCard({ project, onOpen, priority = false }) {
  const { t } = useTranslation();

  return (
    <article className="project-card h-100 transition-custom box-shadow-custom">
      <img
        src={project.image}
        alt={project.title}
        className="project-card-image"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />

      <div className="project-card-body">
        {project.flagship && (
          <span className="project-card-badge">{t("projects.badgeFeatured")}</span>
        )}
        <h3 className="project-card-title">{project.title}</h3>
        <p className="card-body-title">{project.shortDescription}</p>
        <button
          type="button"
          className="btn btn-project-details"
          onClick={() => onOpen(project)}
        >
          {t("projects.viewDetails")}
        </button>
      </div>
    </article>
  );
}
