package com.dem.expense.repository;

import com.dem.expense.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigInteger;

public interface UserRepository extends JpaRepository<User, BigInteger> {

    User findByEmail(String email);
}
