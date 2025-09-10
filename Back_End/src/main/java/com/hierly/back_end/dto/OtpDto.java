package com.hierly.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OtpDto {
    private int id;
    private int otp;
    private LocalTime otpSendTime;
    private String email;
}
