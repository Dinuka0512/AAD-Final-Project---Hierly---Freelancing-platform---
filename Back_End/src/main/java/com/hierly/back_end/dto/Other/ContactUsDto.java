package com.hierly.back_end.dto.Other;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactUsDto {
    private String email;
    private String name;
    private String subject;
    private String message;
}
