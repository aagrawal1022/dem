package com.dem.expense.service;

import com.dem.expense.dto.AddExpenseDto;
import com.dem.expense.entity.Expense;
import com.dem.expense.entity.User;
import com.dem.expense.exception.UserNotFoundException;
import com.dem.expense.repository.ExpenseRepository;
import com.dem.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    public Expense addExpense(AddExpenseDto addExpenseDto){
        User user = userRepository.findById(addExpenseDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException());

        Expense expense = new Expense();
        expense.setDescription(addExpenseDto.getDescription());
        expense.setPaymentMethod(addExpenseDto.getPaymentMethod());
        expense.setAmount(addExpenseDto.getAmount());
        expense.setExpenseDate(addExpenseDto.getExpenseDate());
        expense.setCategory(addExpenseDto.getCategory());
        expense.setUser(user);

        if (addExpenseDto.getBankAccountId() != null) {
            expense.setBankAccount(user.getBankAccounts().stream()
                    .filter(bankAccount -> bankAccount.getId().equals(addExpenseDto.getBankAccountId()))
                    .findFirst()
                    .orElse(null));
        }
        if (addExpenseDto.getCardId() != null) {
            expense.setCard(user.getCardDetails().stream()
                    .filter(card -> card.getId().equals(addExpenseDto.getCardId()))
                    .findFirst()
                    .orElse(null));
        }
        BigDecimal newBalance = user.getAvailableBalance().subtract(expense.getAmount());
        user.setAvailableBalance(newBalance);

        expenseRepository.save(expense);
        userRepository.save(user);

        return expense;
    }
}
