package com.dem.expense.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddIncomeDto extends GeneralDto{
    private String description;
    private BigDecimal amount;
    private LocalDateTime incomeDate;
    private Long bankAccountId;
    private String category;
    private Boolean isPseudoIncome = false;

}
