package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDataDto;
import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.APIResponce;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

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
}
