package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.entity.User;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.APIResponce;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/SignUp")
@RequiredArgsConstructor
public class SignUpController {
    private final UserService userService;

    @PostMapping("/User")
    public APIResponce<String>  signUp(@RequestBody UserDto user) {
        userService.saveUser(user);
        return new APIResponce<>(200, "Success", "User Saved Successfully!..");
    }
}