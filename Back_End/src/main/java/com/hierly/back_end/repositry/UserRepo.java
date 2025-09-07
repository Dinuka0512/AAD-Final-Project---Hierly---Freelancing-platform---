package com.hierly.back_end.repositry;

import aj.org.objectweb.asm.commons.Remapper;
import com.hierly.back_end.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByName(String name);

    boolean existsByEmail(String email);

    User findByEmail(String email);
}
