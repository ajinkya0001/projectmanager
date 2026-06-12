import { useMemo, useState } from 'react'
import { useProjects } from './hooks/useProjects'
import { DashboardPage } from './pages/DashboardPage'
import { ProjectFormPage } from './pages/ProjectFormPage'
import { ProjectListPage } from './pages/ProjectListPage'
import { createProject, deleteProject, updateProject } from './services/projectService'
import './styles/global.css'

const VIEWS = {
  DASHBOARD: 'DASHBOARD',
  LIST: 'LIST',
  FORM: 'FORM',
}

function App() {
  const { projects, loading, error, setProjects, summary } = useProjects()
  const [view, setView] = useState(VIEWS.DASHBOARD)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleAdd = () => {
    setSelectedProject(null)
    setFormError('')
    setView(VIEWS.FORM)
  }

  const handleEdit = (project) => {
    setSelectedProject(project)
    setFormError('')
    setView(VIEWS.FORM)
  }

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete project ${project.name}?`)) {
      return
    }

    try {
      await deleteProject(project.id)
      setProjects((current) => current.filter((item) => item.id !== project.id))
    } catch {
      window.alert('Unable to delete the project.')
    }
  }

  const handleSubmit = async (payload) => {
    setFormError('')
    setIsSaving(true)
    try {
      if (selectedProject) {
        const response = await updateProject(selectedProject.id, payload)
        setProjects((current) =>
          current.map((project) => (project.id === selectedProject.id ? response.data : project)),
        )
      } else {
        const response = await createProject(payload)
        setProjects((current) => [...current, response.data])
      }
      setView(VIEWS.LIST)
    } catch (cause) {
      setFormError(cause?.response?.data?.message ?? 'Unable to save the project.')
    } finally {
      setIsSaving(false)
    }
  }

  const pageTitle = useMemo(() => {
    if (view === VIEWS.LIST) return 'Projects'
    if (view === VIEWS.FORM) return selectedProject ? 'Edit Project' : 'Create Project'
    return 'Dashboard'
  }, [view, selectedProject])

  return (
    <div className="app-shell">
      <aside className="side-nav">
        <div className="brand">
          <div className="brand-mark">PM</div>
          <div>
            <p className="brand-label">ProjectManager</p>
            <p className="brand-caption">Management dashboard</p>
          </div>
        </div>

        <nav className="nav-links">
          <button
            type="button"
            className={`nav-link ${view === VIEWS.DASHBOARD ? 'active' : ''}`}
            onClick={() => setView(VIEWS.DASHBOARD)}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`nav-link ${view === VIEWS.LIST ? 'active' : ''}`}
            onClick={() => setView(VIEWS.LIST)}
          >
            Projects
          </button>
          <button
            type="button"
            className={`nav-link ${view === VIEWS.FORM && !selectedProject ? 'active' : ''}`}
            onClick={handleAdd}
          >
            Create Project
          </button>
        </nav>

        <button type="button" className="primary-button nav-cta" onClick={handleAdd}>
          + New Project
        </button>
      </aside>

      <main className="content-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>{pageTitle}</h1>
          </div>
          <div className="top-actions">
            <span className="status-pill online">Online</span>
          </div>
        </header>

        {view === VIEWS.DASHBOARD && <DashboardPage summary={summary} />}
        {view === VIEWS.LIST && (
          <ProjectListPage
            projects={projects}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {view === VIEWS.FORM && (
          <ProjectFormPage
            project={selectedProject}
            onSubmit={handleSubmit}
            onCancel={() => setView(VIEWS.LIST)}
            isSaving={isSaving}
            error={formError}
          />
        )}
      </main>
    </div>
  )
}

export default App
