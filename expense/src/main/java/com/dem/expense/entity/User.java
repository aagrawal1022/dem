package com.dem.expense.entity;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_generator")
    @SequenceGenerator(name = "user_generator", sequenceName = "user_id_gen", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private BigInteger id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private BigDecimal availableBalance;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Card> cardDetails;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BankAccount> bankAccounts;

    @OneToMany(mappedBy = "user")
    private List<Expense> expenses;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", availableBalance=" + availableBalance +
                ", cardDetails=" + cardDetails +
                ", bankAccounts=" + bankAccounts +
                '}';
    }
}
