package com.hierly.back_end.controller;

import com.hierly.back_end.util.FileUploadUtil;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

@RestController
@RequestMapping("/User")
public class UserImageUploadController {
    @PostMapping("/SaveImage")
    public void saveImage(@RequestParam MultipartFile file) {
        String uploadDir = "images";
        Arrays.asList(file).stream().forEach(file1 -> {
            String fileName = StringUtils.cleanPath(file1.getOriginalFilename());
            System.out.println(fileName);

            try{
                FileUploadUtil.saveFile(uploadDir, fileName, file);
            }catch (IOException e){
                e.printStackTrace();
            }
        });
    }
}
