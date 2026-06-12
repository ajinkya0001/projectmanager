import { apiClient } from './apiClient';

export const fetchProjects = () => apiClient.get('/projects');
export const fetchProjectById = (id) => apiClient.get(`/projects/${id}`);
export const createProject = (project) => apiClient.post('/projects', project);
export const updateProject = (id, project) => apiClient.put(`/projects/${id}`, project);
export const deleteProject = (id) => apiClient.delete(`/projects/${id}`);
