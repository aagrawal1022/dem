package com.dem.expense.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bankName;
    private Long lastFourDigit;

    @ManyToOne
    private User user;


    @Override
    public String toString() {
        return "BankAccount{" +
                "id=" + id +
                ", bankName='" + bankName + '\'' +
                ", lastFourDigit=" + lastFourDigit +
                '}';
    }
}