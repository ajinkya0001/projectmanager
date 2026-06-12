import { ProjectCard } from '../components/ProjectCard';

export const DashboardPage = ({ summary }) => (
  <section className="page-grid">
    <header className="page-header">
      <div>
        <p className="eyebrow">Dashboard</p>
        <h1>Project performance snapshot</h1>
      </div>
    </header>

    <div className="dashboard-grid">
      <ProjectCard title="Total projects" value={summary.total} accent="primary" />
      <ProjectCard title="Active projects" value={summary.active} accent="info" />
      <ProjectCard title="Completed projects" value={summary.completed} accent="success" />
    </div>
  </section>
);
