export default function ProjectCard({ project, onOpen }) {
  return (
    <div
      className="card border-0 h-100 transition-custom box-shadow-custom"
      onClick={() => onOpen(project)}
      style={{ cursor: "pointer" }}
    >
      <img src={project.image} alt={project.title} />

      <div className="card-body">
        <h5>{project.title}</h5>
        <p className="card-body-title">{project.shortDescription}</p>
        <button className="btn btn-primary">View Details</button>
      </div>
    </div>
  );
}
