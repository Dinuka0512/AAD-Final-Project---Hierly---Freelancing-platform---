package com.hierly.back_end.controller;

import com.hierly.back_end.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Home")
@RequiredArgsConstructor
public class HomeController {
    private final JWTUtil jwtUtil;

    @GetMapping("/getName")
    public String getName(){
        return jwtUtil.generateJWTToken("Dinuka");
    }

    @GetMapping("/getUser")
    public String hi(@RequestParam("token") String token){
        return jwtUtil.getUserFromJWTToken(token);
    }

    @GetMapping("/isValid")
    public boolean isValid(@RequestParam("token") String token){
        return jwtUtil.validateToken(token);
    }
}
