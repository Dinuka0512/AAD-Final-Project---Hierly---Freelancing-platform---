package com.hierly.back_end.service;

import com.hierly.back_end.dto.UserDto;

public interface UserService {
    void saveUser(UserDto user);

    boolean isEmailExist(String email);

    UserDto getUserDetails(String email);
}
