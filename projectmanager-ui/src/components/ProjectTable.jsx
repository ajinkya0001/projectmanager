export const ProjectTable = ({ projects, onEdit, onDelete }) => (
  <div className="card table-card">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.length === 0 ? (
          <tr>
            <td colSpan="4" className="empty-state">
              No matching projects found.
            </td>
          </tr>
        ) : (
          projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>
                <button type="button" className="ghost-button" onClick={() => onEdit(project)}>
                  Edit
                </button>
                <button type="button" className="danger-button" onClick={() => onDelete(project)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
