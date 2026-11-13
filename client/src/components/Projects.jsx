import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal/ProjectModal";
import SchedulerProSpotlight from "./SchedulerProSpotlight";
import { projects } from "../data/projects";
import { localizeProject } from "../utils/localizeProject";

export default function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const localizedProjects = useMemo(
    () => projects.map((project) => localizeProject(project, t)),
    [t],
  );

  const schedulerProject = localizedProjects.find((p) => p.slug === "schedulerpro");

  const visibleProjects = useMemo(() => {
    if (filter === "flagship") {
      return localizedProjects.filter(
        (project) => project.flagship && project.slug !== "schedulerpro",
      );
    }
    return localizedProjects.filter((project) => !project.featured);
  }, [filter, localizedProjects]);

  return (
    <>
      <section id="projects" className="section-block container py-5">
        <h2 className="display-5 fw-bold mb-4 text-center">{t("projects.title")}</h2>

        <SchedulerProSpotlight
          onOpenScheduler={() => setSelectedProject(schedulerProject)}
        />

        <div
          className="d-flex flex-wrap justify-content-center gap-2 mb-4"
          role="tablist"
          aria-label={t("projects.title")}
        >
          <button
            type="button"
            role="tab"
            aria-selected={filter === "all"}
            className={`btn btn-filter ${filter === "all" ? "btn-filter-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            {t("projects.filterAll")}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === "flagship"}
            className={`btn btn-filter ${filter === "flagship" ? "btn-filter-active" : ""}`}
            onClick={() => setFilter("flagship")}
          >
            {t("projects.filterFeatured")}
          </button>
        </div>

        <div className="row g-4">
          {visibleProjects.map((project, index) => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <ProjectCard
                project={project}
                onOpen={setSelectedProject}
                priority={filter === "all" && index === 0}
              />
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
