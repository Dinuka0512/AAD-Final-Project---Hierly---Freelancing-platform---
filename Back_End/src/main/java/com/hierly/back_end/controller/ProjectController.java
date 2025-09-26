package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.entity.Project;
import com.hierly.back_end.entity.User;
import com.hierly.back_end.service.OtpService;
import com.hierly.back_end.service.ProjectService;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.service.impl.CloudinaryService;
import com.hierly.back_end.util.APIResponce;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class ProjectController {
    private final JwtUtil jwtUtil;
    private final ProjectService projectService;
    private final UserService  userService;
    private final ModelMapper modelMapper;
    private final CloudinaryService cloudinaryService;

    @PostMapping("/PostProject")
    public APIResponce<Boolean> postProject(@RequestHeader("Authorization")String token,
                                            @RequestParam("title") String title,
                                            @RequestParam("description") String description,
                                            @RequestParam("budget") double budget,
                                            @RequestParam("files") ArrayList<MultipartFile> files) {

        try {
            token = token.substring(7).trim();

            if (!jwtUtil.validateToken(token)) {
                return new APIResponce<>(401, "Invalid or Expired Token!", null);
            }

            String email = jwtUtil.extractUsername(token);
            if(userService.isEmailExist(email)) {
                if (email != null) {
                    try {
                        //SAVE PROJECT
                        User user = modelMapper.map(userService.getUserDetails(email), User.class);  // ----HERE GETTING THE USER DATA

                        // 1️⃣ Save file to local folder
                        String uploadDir = "/Client/Projects";
                        File dir = new File(uploadDir);
                        if (!dir.exists()) dir.mkdirs();

                        //GET THE UPLOADED FILE LINKS
                        List<String> strings = cloudinaryService.uploadFiles(files, uploadDir); // HERE UPLOAD AND GIVING THE LINKS ARRAY

                        //HERE SAVING THE PROJECT OBJECT
                        boolean isSaved = projectService.saveProject(user, title, description, budget, (ArrayList<String>) strings);
                        return new APIResponce<>(200, "Is Project Saved", isSaved);
                    } catch (UsernameNotFoundException ex) {
                        return new APIResponce<>(404, "No User Found!", null);
                    }
                }
            }
            return new APIResponce<>(400, "User Not Found!", null);
        } catch (Exception e) {
            return new APIResponce<>(500, "Error validating token: " + e.getMessage(), null);
        }
    }
}
