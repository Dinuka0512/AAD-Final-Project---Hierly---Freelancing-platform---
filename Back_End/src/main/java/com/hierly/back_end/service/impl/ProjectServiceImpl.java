package com.hierly.back_end.service.impl;

import com.hierly.back_end.entity.Project;
import com.hierly.back_end.entity.User;
import com.hierly.back_end.repositry.ProjectRepo;
import com.hierly.back_end.service.ProjectService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepo projectRepo;

    @Override
    public boolean saveProject(User user, String title, String description, double budget, ArrayList<String> files) {
        Project project = new Project();
        project.setUser(user);
        project.setTitle(title);
        project.setDescription(description);
        project.setBudget(budget);
        project.setFiles(files);
        project.setPostDate(LocalDate.now().toString()); //TODAY
        project.setDateDue(LocalDate.now().plusWeeks(2).toString());  //AFTER 2 WEEKS

        projectRepo.save(project);
        return true;
    }
}
