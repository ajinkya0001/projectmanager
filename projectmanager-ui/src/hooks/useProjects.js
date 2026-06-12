import { useEffect, useMemo, useState } from 'react';
import { fetchProjects } from '../services/projectService';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProjects()
      .then((response) => setProjects(response.data))
      .catch(() => setError('Unable to load projects.'))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const total = projects.length;
    const active = projects.filter((project) => project.status === 'IN_PROGRESS').length;
    const completed = projects.filter((project) => project.status === 'COMPLETED').length;

    return { total, active, completed };
  }, [projects]);

  return { projects, loading, error, setProjects, summary };
};
