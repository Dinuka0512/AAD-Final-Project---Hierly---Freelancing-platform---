package com.hierly.back_end.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Home")
public class HomeController {

    @GetMapping("/getName")
    public String getName(){
        return "Hello World";
    }

    @GetMapping("/hi")
    public String hi(){
        return "HI....";
    }
}
