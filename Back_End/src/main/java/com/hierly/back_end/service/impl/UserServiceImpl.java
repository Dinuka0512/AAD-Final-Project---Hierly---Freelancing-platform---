package com.hierly.back_end.service.impl;

import com.hierly.back_end.dto.UserDataDto;
import com.hierly.back_end.dto.UserDto;
import com.hierly.back_end.entity.User;
import com.hierly.back_end.repositry.UserRepo;
import com.hierly.back_end.service.UserService;
import com.hierly.back_end.util.PasswordEncryptor;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public boolean saveUser(UserDto user) {
        if(userRepo.existsByEmail(user.getEmail())) {
            return false;
        }
        user.setPassword(PasswordEncryptor.encrypt(user.getPassword()));
        userRepo.save(modelMapper.map(user, User.class));
        return true;
    }

    @Override
    public boolean isEmailExist(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public UserDto getUserDetails(String email) {
        User user = userRepo.findByEmail(email).get();
        user.setPassword(PasswordEncryptor.decrypt(user.getPassword()));
        return (user==null)? null : modelMapper.map(user, UserDto.class);
    }

    @Override
    public boolean updateUserPassword(UserDataDto userDataDto) {
        // Find user by username or email (depending on your logic)
        Optional<User> optionalUser = userRepo.findByEmail(userDataDto.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(PasswordEncryptor.encrypt(userDataDto.getPassword()));

            // Save updated user
            userRepo.save(user);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean updateFreelancer(String email, String name, String bio, double hourlyRate) {
        User user = userRepo.findByEmail(email).get();
        user.setName(name);
        user.setBio(bio);
        user.setHourlyRate(hourlyRate);
        userRepo.save(user);
        return true;
    }
}
