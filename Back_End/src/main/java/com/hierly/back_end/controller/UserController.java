package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDataDto;
import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.APIResponce;
import com.hierly.back_end.util.Gmail;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Random;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private int otp;
    private LocalTime otpSendTime;

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
    public APIResponce<Boolean> isUserExist(@RequestBody String email) {
        return new APIResponce<>(200, "Is User Email Exist", userService.isEmailExist(email));
    }

    @PostMapping("/SendMail")
    public APIResponce<Boolean> sendMail(@RequestBody String email) {
        if(userService.isEmailExist(email)){
            otp = new Random().nextInt(900000) + 100000; // Ensures a 6-digit OTP

            String subject = "Your Hierly Verification Code";
            String body = "Hello,\n\n" +
                    "Your One-Time Password (OTP) for Hierly is: " + otp + "\n\n" +
                    "Please enter this code on the website to verify your email address.\n" +
                    "This code will expire in 10 minutes.\n\n" +
                    "If you did not request this, please ignore this email.\n\n" +
                    "Best regards,\n" +
                    "The Hierly Team";

            boolean isGmailSend = Gmail.sendEmails("Dinuhi0512@gmail.com", email, subject, body);
            otpSendTime = LocalTime.now();
            return new APIResponce<>(200, "Send Mail Success", isGmailSend);
        }
        return new APIResponce<>(400, "Email Not Found", false);
    }
}
