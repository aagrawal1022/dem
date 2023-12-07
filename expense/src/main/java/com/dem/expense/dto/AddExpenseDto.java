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
public class AddExpenseDto extends GeneralDto {
    private String description;
    private String paymentMethod;
    private BigDecimal amount;
    private LocalDateTime expenseDate;
    private Long cardId;
    private Long bankAccountId;
    private String category;
}
