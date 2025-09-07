package com.hierly.back_end.controller;

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
    public APIResponce<String> login(@RequestParam("email") String email,
                                     @RequestParam("password") String password) {
        if(userService.isEmailExist(email)){
            //email exist
            UserDto user = userService.getUserDetails(email);
            if(user.getPassword().equals(password)){
                //Password Ok
                String token = jwtUtil.generateToken(email);
                return new APIResponce<>(200, "Success", token);
            }else{
                return new APIResponce<>(500, "Error", "Invalid Credentials");
            }
        }else{
            //email not found
            return new APIResponce<>(401, "Email Not Found", null);
        }
    }

    @GetMapping("/validate")
    public boolean validate(@RequestParam("token") String token) {
        return jwtUtil.validateToken(token);
    }
}
