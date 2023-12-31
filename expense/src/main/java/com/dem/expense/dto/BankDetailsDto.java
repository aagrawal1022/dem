package com.dem.expense.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BankDetailsDto extends GeneralDto {

    private String bankName;

    private Long lastFourDigit;

}
