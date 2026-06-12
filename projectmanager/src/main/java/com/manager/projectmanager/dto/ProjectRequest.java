package com.manager.projectmanager.dto;

import com.manager.projectmanager.entity.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {

    @NotBlank(message = "Project name must not be blank")
    private String name;

    @NotBlank(message = "Project description must not be blank")
    private String description;

    @NotNull(message = "Project status must be provided")
    private ProjectStatus status;
}
