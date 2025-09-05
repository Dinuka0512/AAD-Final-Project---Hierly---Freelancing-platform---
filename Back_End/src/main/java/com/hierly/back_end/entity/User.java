package com.hierly.back_end.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String profilePicture;

    //FREELANCER
    private String bio;
    private double hourlyRate;
    private String portfolioMediaLinks;
    private String ratings;
    private String skills;

    public User(String id, String name, String email, String password, String role, String profilePicture) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profilePicture = profilePicture;
    }
}