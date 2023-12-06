package com.dem.expense.entity;

import com.dem.expense.utils.CardType;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cardName;
    private Long lastFourDigit;

    @Enumerated(EnumType.STRING)
    private CardType cardType; 

    @ManyToOne
    private User user;

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", cardName='" + cardName + '\'' +
                ", lastFourDigit=" + lastFourDigit +
                ", cardType=" + cardType +
                '}';
    }
}
