package com.hierly.back_end.repositry;

import com.hierly.back_end.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface OtpRepo extends JpaRepository<Otp, Integer> {
    ArrayList<Otp> findByEmail(String email);

    void deleteByEmail(String email);
}
