package com.hierly.back_end.service.impl;

import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.entity.User;
import com.hierly.back_end.repositry.UserRepo;
import com.hierly.back_end.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;

    @Override
    public void saveUser(UserDto user) {
        userRepo.save(modelMapper.map(user, User.class));
    }

    @Override
    public boolean isEmailExist(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public UserDto getUserDetails(String email) {
        User user = userRepo.findByEmail(email);
        return (user==null)? null : modelMapper.map(user, UserDto.class);
    }
}
