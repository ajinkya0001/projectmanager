import { useMemo } from 'react';

const STATUS_OPTIONS = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export const ProjectFormPage = ({ project, onSubmit, onCancel, isSaving, error }) => {
  const isEditMode = Boolean(project?.id);

  const initialValues = useMemo(
    () => ({
      name: project?.name ?? '',
      description: project?.description ?? '',
      status: project?.status ?? 'PLANNED',
    }),
    [project],
  );

  return (
    <section className="page-grid form-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{isEditMode ? 'Update project' : 'Create project'}</p>
          <h1>{isEditMode ? 'Edit project details' : 'Add a new project'}</h1>
        </div>
      </header>

      <form
        className="card form-card"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target;
          const payload = {
            name: form.name.value.trim(),
            description: form.description.value.trim(),
            status: form.status.value,
          };
          onSubmit(payload);
        }}
      >
        <div className="form-grid">
          <label>
            Project name
            <input name="name" defaultValue={initialValues.name} required minLength={3} />
          </label>
          <label>
            Description
            <textarea name="description" defaultValue={initialValues.description} required minLength={10} rows={5} />
          </label>
          <label>
            Status
            <select name="status" defaultValue={initialValues.status}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && <div className="status-banner error">{error}</div>}

        <div className="button-row">
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary-button" disabled={isSaving}>
            {isSaving ? 'Saving...' : isEditMode ? 'Update project' : 'Create project'}
          </button>
        </div>
      </form>
    </section>
  );
};
