package com.manager.projectmanager.service.impl;

import com.manager.projectmanager.dto.ProjectRequest;
import com.manager.projectmanager.dto.ProjectResponse;
import com.manager.projectmanager.entity.Project;
import com.manager.projectmanager.repository.ProjectRepository;
import com.manager.projectmanager.service.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public List<ProjectResponse> findAllProjects() {
        return projectRepository.findAll().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse findProjectById(Long id) {
        return projectRepository.findById(id)
            .map(this::toResponse)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
    }

    @Override
    @Transactional
    public ProjectResponse createProject(ProjectRequest projectRequest) {
        Project project = toEntity(projectRequest);
        Project saved = projectRepository.save(project);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest projectRequest) {
        Project existing = projectRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));

        existing.setName(projectRequest.getName());
        existing.setDescription(projectRequest.getDescription());
        existing.setStatus(projectRequest.getStatus());

        Project updated = projectRepository.save(existing);
        return toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteProject(Long id) {
        Project existing = projectRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
        projectRepository.delete(existing);
    }

    private ProjectResponse toResponse(Project entity) {
        return ProjectResponse.builder()
            .id(entity.getId())
            .name(entity.getName())
            .description(entity.getDescription())
            .status(entity.getStatus())
            .build();
    }

    private Project toEntity(ProjectRequest request) {
        return Project.builder()
            .name(request.getName())
            .description(request.getDescription())
            .status(request.getStatus())
            .build();
    }
}
