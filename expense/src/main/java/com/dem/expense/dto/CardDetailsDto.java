package com.dem.expense.dto;

import com.dem.expense.utils.CardType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardDetailsDto extends GeneralDto {

    private String cardName;

    private Long lastFourDigit;

    private CardType cardType;

}
