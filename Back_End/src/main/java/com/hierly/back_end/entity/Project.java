package com.hierly.back_end.entity;

import jakarta.persistence.*;
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
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private  String title;
    private  String description;

    //DATES
    private String postDate;
    private String dateDue;

    private double budget;

    //STATUS - COMPLETE | INCOMPLETE | EXPIRED | IN PROGRESS
    private String status;

    //CLIENT
    @ManyToOne
    private User user;
    private ArrayList<String> files;
}
