package com.hierly.back_end.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hierly.back_end.dto.OtpDto;
import com.hierly.back_end.entity.Otp;
import com.hierly.back_end.repositry.OtpRepo;
import com.hierly.back_end.service.OtpService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {
    private final OtpRepo otpRepo;
    private final ModelMapper modelMapper;

    @Override
    public void saveOtp(OtpDto otpDto) {
        otpRepo.save(modelMapper.map(otpDto, Otp.class));
    }

    @Override
    public ArrayList<OtpDto> getOtpFromEmail(String email) {
        ArrayList<Otp> otps = otpRepo.findByEmail(email);
        ArrayList<OtpDto> otpDtos = new ArrayList<>();
        for (Otp otp : otps) {
            OtpDto otpDto = new OtpDto(
                    otp.getId(),
                    otp.getOtp(),
                    otp.getOtpSendTime(),
                    otp.getEmail()
            );

            otpDtos.add(otpDto);
        }

        return otpDtos;
    }

    @Override
    @Transactional
    public void deleteOtpByEmail(String email) {
        otpRepo.deleteByEmail(email);
    }


}
