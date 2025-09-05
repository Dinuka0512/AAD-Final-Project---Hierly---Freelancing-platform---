package com.hierly.back_end.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Project {
    @Id
    private String id;
    private  String title;
    private  String description;
    private double budget;
    private String deadline;
    private String status;

    //CLIENT
    @ManyToOne
    private User user;
}
