package com.hierly.back_end.controller;

import com.hierly.back_end.entity.Project;
import com.hierly.back_end.service.ProjectService;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {
    private final JwtUtil jwtUtil;
    private final ProjectService projectService;

    @PostMapping("/PostProject")
    public ResponseEntity<Project> postProject(@RequestBody Project project) {
        return null;
    }
}
