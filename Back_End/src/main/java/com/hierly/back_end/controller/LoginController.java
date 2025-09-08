package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDataDto;
import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.APIResponce;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class LoginController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

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
                return new APIResponce<>(500, "Error", "Invalid Credentials");
            }
        }else{
            //email not found
            return new APIResponce<>(401, "Email Not Found", null);
        }
    }
}
