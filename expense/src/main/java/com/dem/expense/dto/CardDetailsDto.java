package com.dem.expense.dto;

import com.dem.expense.utils.CardType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardDetailsDto {

    private String cardName;

    private Long lastFourDigit;

    private CardType cardType;

    private BigInteger userId;

}
