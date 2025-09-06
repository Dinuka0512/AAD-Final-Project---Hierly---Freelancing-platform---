package com.hierly.back_end.util;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class APIResponce <T>{
    private int status;
    private String message;
    private T data;
}
