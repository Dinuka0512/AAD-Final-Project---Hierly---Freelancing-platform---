package com.hierly.back_end.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private String id;
    private String name;
    private String email;
    private String password;
    private String role;

    private String profilePicture;

    //FREELANCER
    private String title;
    private String bio;
    private double hourlyRate;
    private ArrayList<String> skills;
    private String linkedInLink;
    private String gitHubLink;
    private String websiteLink;

    public UserDto(String id, String name, String email, String password, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}