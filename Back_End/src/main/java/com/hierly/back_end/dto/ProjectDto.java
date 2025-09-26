package com.hierly.back_end.dto;

import com.hierly.back_end.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectDto {
    private int id;
    private  String title;
    private  String description;
    private String postDate;
    private String dateDue;
    private double budget;
    private String status;
    private User user;
    private ArrayList<String> files;
}
