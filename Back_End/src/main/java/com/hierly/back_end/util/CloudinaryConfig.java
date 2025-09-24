package com.hierly.back_end.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dgokbm0dx",
                "api_key", "112839717968118",
                "api_secret", "vfKeGWSmdXnyOJj5AfP0dBlaT7E"));
    }
}
