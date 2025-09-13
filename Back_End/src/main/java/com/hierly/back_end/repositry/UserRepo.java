package com.hierly.back_end.repositry;

import com.hierly.back_end.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByName(String name);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
