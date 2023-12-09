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

    public void setCardType(CardType cardType) {
        if (cardType == null) {
            throw new IllegalArgumentException("Card type cannot be null");
        }
        this.cardType = cardType;
    }

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
