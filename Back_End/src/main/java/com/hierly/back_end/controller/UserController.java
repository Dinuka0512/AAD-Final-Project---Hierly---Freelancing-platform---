package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDataDto;
import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.dto.OtpDto;
import com.hierly.back_end.service.OtpService;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.APIResponce;
import com.hierly.back_end.util.Gmail;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Random;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;

    @PostMapping("/SignUp")
    public APIResponce<String>  signUp(@RequestBody UserDto user) {
        userService.saveUser(user);
        return new APIResponce<>(200, "Success", "User Saved Successfully!..");
    }

    @PostMapping("/login")
    public APIResponce<String> login(@RequestBody UserDataDto userDataDto) {
        if(userService.isEmailExist(userDataDto.getEmail())){
            //email exist
            UserDto user = userService.getUserDetails(userDataDto.getEmail());
            if(user.getPassword().equals(userDataDto.getPassword())){
                //Password Ok - NOW GENERATE THE TOKEN USING THE EMAIL
                String token = jwtUtil.generateToken(userDataDto.getEmail());
                return new APIResponce<>(200, user.getRole() + " Login Success", token);
            }else{
                return new APIResponce<>(500, "Error Invalid Credentials", "Invalid Credentials");
            }
        }else{
            //email not found
            return new APIResponce<>(401, "Email Not Found", null);
        }
    }

    @PostMapping("/IsUserExist")
    public APIResponce<Object> isUserExist(@RequestBody String email) {
        return new APIResponce<>(200, "Is User Email Exist", userService.isEmailExist(email));
    }

    @PostMapping("/SendMail")
    public APIResponce<Boolean> sendMail(@RequestBody String email) {
        if(userService.isEmailExist(email)){
            OtpDto otpDto = new OtpDto();
            otpDto.setOtp(new Random().nextInt(900000) + 100000);
            otpDto.setOtpSendTime(LocalTime.now());
            otpDto.setEmail(email);

            //OTP SAVE
            otpService.saveOtp(otpDto);

            String subject = "Your Hierly Verification Code";
            String body = "Hello,\n\n" +
                    "Your One-Time Password (OTP) for Hierly is: " + otpDto.getOtp() + "\n\n" +
                    "Please enter this code on the website to verify your email address.\n" +
                    "This code will expire in 10 minutes.\n\n" +
                    "If you did not request this, please ignore this email.\n\n" +
                    "Best regards,\n" +
                    "The Hierly Team";

            boolean isGmailSend = Gmail.sendEmails("Dinuhi0512@gmail.com", email, subject, body);
            return new APIResponce<>(200,"Email is Send Ok", isGmailSend);
        }
        return new APIResponce<>(400, "Email is not send", false);
    }

    @PostMapping("/Verify")
    public APIResponce<Boolean> verify(@RequestBody String email, @RequestParam("otp") int otp) {
        ArrayList<OtpDto> otpDtos = otpService.getOtpFromEmail(email);

        if (otpDtos != null && !otpDtos.isEmpty()) {
            LocalTime nowTime = LocalTime.now();
            for (OtpDto otpDto : otpDtos) {
                if (otp == otpDto.getOtp() && nowTime.isBefore(otpDto.getOtpSendTime().plusMinutes(10))) {
                    System.out.println("hi");
                    otpService.deleteOtpByEmail(otpDto.getEmail());
                    return new APIResponce<>(200, "OTP verified successfully", true);
                }
            }
            return new APIResponce<>(400, "Invalid or expired OTP", false);
        }

        return new APIResponce<>(400, "Invalid OTP", false);
    }

    @PostMapping("/UpdatePassword")
    public APIResponce<Boolean> updatePassword(@RequestBody UserDataDto userDataDto) {
        System.out.println(userDataDto.getPassword());
        boolean isUpdated = userService.updateUserPassword(userDataDto);
        return new APIResponce<>(200, "IS Updated : ", isUpdated);
    }
}
