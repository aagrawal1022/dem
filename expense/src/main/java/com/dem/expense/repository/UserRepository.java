package com.dem.expense.repository;

import com.dem.expense.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;

public interface UserRepository extends JpaRepository<User, BigInteger> {

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.cardDetails LEFT JOIN FETCH u.bankAccounts WHERE u.email = :email")
    User findByEmail(String email);

}
