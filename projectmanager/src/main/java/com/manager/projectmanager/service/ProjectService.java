package com.manager.projectmanager.service;

import com.manager.projectmanager.dto.ProjectRequest;
import com.manager.projectmanager.dto.ProjectResponse;
import java.util.List;

public interface ProjectService {

    List<ProjectResponse> findAllProjects();

    ProjectResponse findProjectById(Long id);

    ProjectResponse createProject(ProjectRequest projectRequest);

    ProjectResponse updateProject(Long id, ProjectRequest projectRequest);

    void deleteProject(Long id);
}
