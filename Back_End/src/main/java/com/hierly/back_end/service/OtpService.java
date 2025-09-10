package com.hierly.back_end.service;

import com.hierly.back_end.dto.OtpDto;

import java.util.ArrayList;

public interface OtpService {
    void saveOtp(OtpDto otpDto);

    ArrayList<OtpDto> getOtpFromEmail(String email);

    void deleteOtpByEmail(String email);
}
