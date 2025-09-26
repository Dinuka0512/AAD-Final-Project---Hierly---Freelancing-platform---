package com.hierly.back_end.service;

import com.hierly.back_end.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

public interface ProjectService {
    boolean saveProject(User user, String title, String description, double budget, ArrayList<String> files);
}
