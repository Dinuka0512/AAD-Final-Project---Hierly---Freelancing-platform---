package com.hierly.back_end.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    // folderPath = "vehicles", "users/profile", "products", etc.
    public String uploadToCloudinary(MultipartFile file, String folderPath) {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("folder", folderPath)
            );
            return uploadResult.get("secure_url").toString(); // return image URL
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed", e);
        }
    }

    // Upload multiple PDFs or images
    public List<String> uploadFiles(List<MultipartFile> files, String folderPath) {
        List<String> uploadedUrls = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                Map uploadResult = cloudinary.uploader().upload(
                        file.getBytes(),
                        ObjectUtils.asMap(
                                "folder", folderPath,
                                "resource_type", "auto" // "image" or "raw"
                        )
                );
                uploadedUrls.add(uploadResult.get("secure_url").toString());
            }
            return uploadedUrls;
        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }
}
