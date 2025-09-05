package com.hierly.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BidDto {
    private String id;
    private String message;
    private double amount;
    private String status;
    private UserDto user;
}
