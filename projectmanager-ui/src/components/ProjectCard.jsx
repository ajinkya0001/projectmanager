export const ProjectCard = ({ title, value, accent }) => (
  <div className="card dashboard-card">
    <div className="card-title">{title}</div>
    <div className="card-value">{value}</div>
    <div className={`status-pill ${accent}`}>{accent.replace('-', ' ')}</div>
  </div>
);
