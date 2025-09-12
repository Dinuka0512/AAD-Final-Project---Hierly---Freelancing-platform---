package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.entity.User;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.APIResponce;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/TemplateUser")
public class UserTemplateController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    @PostMapping("/load")
    public APIResponce<User> load(@RequestHeader("Authorization") String token) {
        System.out.println(token);
        token = token.substring(7).trim();
        String email = jwtUtil.extractUsername(token);
        if(email != null) {
            //NEED TO GET USER ALL DATA
            UserDto userDetails = userService.getUserDetails(email);
            return new APIResponce<>(200, "User Found", modelMapper.map(userDetails, User.class));
        }
        return new APIResponce<>(400, "User Not Found!", null);
    }
}
