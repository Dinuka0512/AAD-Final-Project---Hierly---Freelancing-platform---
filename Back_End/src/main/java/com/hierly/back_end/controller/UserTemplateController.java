package com.hierly.back_end.controller;

import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.entity.User;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.APIResponce;
import com.hierly.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        try {
            token = token.substring(7).trim();

            if (!jwtUtil.validateToken(token)) {
                return new APIResponce<>(401, "Invalid or Expired Token!", null);
            }

            String email = jwtUtil.extractUsername(token);
            if(userService.isEmailExist(email)) {
                if (email != null) {
                    try {
                        UserDto userDetails = userService.getUserDetails(email);

                        if (userDetails == null) {
                            return new APIResponce<>(404, "No User Found!", null);
                        }

                        return new APIResponce<>(200, "User Found", modelMapper.map(userDetails, User.class));
                    } catch (UsernameNotFoundException ex) {
                        return new APIResponce<>(404, "No User Found!", null);
                    }
                }
            }
            return new APIResponce<>(400, "User Not Found!", null);
        } catch (Exception e) {
            return new APIResponce<>(500, "Error validating token: " + e.getMessage(), null);
        }
    }

    @PostMapping("/update")
    public APIResponce<Boolean> update(@RequestHeader("Authorization") String token,
                                    @RequestParam("name") String name,
                                    @RequestParam("bio") String bio,
                                    @RequestParam("hourlyRate") String hourlyRate) {
        try {
            System.out.println("HI");
            token = token.substring(7).trim();

            if (!jwtUtil.validateToken(token)) {
                return new APIResponce<>(401, "Invalid or Expired Token!", null);
            }

            String email = jwtUtil.extractUsername(token);
            if(userService.isEmailExist(email)) {
                if (email != null) {
                    try {
                        //UPDATE
                        boolean isUpdated = userService.updateFreelancer(email,name, bio, Double.parseDouble(hourlyRate));
                        return new APIResponce<>(200, "User Updated", isUpdated);
                    } catch (UsernameNotFoundException ex) {
                        return new APIResponce<>(404, "No User Found!", null);
                    }
                }
            }
            return new APIResponce<>(400, "User Not Found!", null);
        } catch (Exception e) {
            return new APIResponce<>(500, "Error validating token: " + e.getMessage(), null);
        }
    }
}
