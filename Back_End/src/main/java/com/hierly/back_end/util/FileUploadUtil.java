package com.hierly.back_end.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.channels.MulticastChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


public class FileUploadUtil {
    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get("C:\\Users\\Welcome\\OneDrive\\Documents\\Learning Files\\Projects\\Seccond Semester\\AAD - Advance Api Development\\AAD FINAL PROJECT\\AAD-Final-Project---Hierly---Freelancing-platform---\\Back_End\\src\\main\\resources\\static" + uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream =  multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }catch(IOException e){
            System.out.println(e.getMessage());
        }
    }
}