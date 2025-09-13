package com.hierly.back_end.service;

import com.hierly.back_end.dto.UserDataDto;
import com.hierly.back_end.dto.UserDto;

public interface UserService {
    boolean saveUser(UserDto user);

    boolean isEmailExist(String email);

    UserDto getUserDetails(String email);

    boolean updateUserPassword(UserDataDto userDataDto);

    boolean updateFreelancer(String email, String name, String bio, double hourlyRate);
}
