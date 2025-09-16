package com.hierly.back_end.service;

import com.hierly.back_end.dto.UserDataDto;
import com.hierly.back_end.dto.UserDto;

import java.util.ArrayList;

public interface UserService {
    boolean saveUser(UserDto user);

    boolean isEmailExist(String email);

    UserDto getUserDetails(String email);

    boolean updateUserPassword(UserDataDto userDataDto);

    boolean updateFreelancer(String email, String name, String bio, double hourlyRate);

    boolean updateSkills(ArrayList<String> skills, String email);

    boolean saveWebLinks(String email, String linkedIn, String gitHub, String webSite);
}
