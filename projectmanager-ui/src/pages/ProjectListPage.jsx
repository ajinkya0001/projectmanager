import { useMemo, useState } from 'react';
import { ProjectTable } from '../components/ProjectTable';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ProjectListPage = ({ projects, loading, error, onEdit, onDelete }) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery = project.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [projects, query, statusFilter]);

  return (
    <section className="page-grid">
      <header className="page-header">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Manage your portfolio</h1>
        </div>
        <div className="filter-row">
          <input
            type="search"
            className="search-field"
            placeholder="Search by name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="ALL">All statuses</option>
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </header>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="status-banner error">{error}</div>
      ) : (
        <ProjectTable projects={filteredProjects} onEdit={onEdit} onDelete={onDelete} />
      )}
    </section>
  );
};
