package com.dem.expense.service;

import com.dem.expense.dto.AddIncomeDto;
import com.dem.expense.entity.Expense;
import com.dem.expense.entity.Income;
import com.dem.expense.entity.User;
import com.dem.expense.exception.UserNotFoundException;
import com.dem.expense.repository.IncomeRepository;
import com.dem.expense.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Slf4j
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;
    @Autowired
    private UserRepository userRepository;

    public Income addIncome(AddIncomeDto addIncomeDto){
        User user = userRepository.findById(addIncomeDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException());

        Income income = new Income();
        income.setDescription(addIncomeDto.getDescription());
        income.setAmount(addIncomeDto.getAmount());
        income.setIncomeDate(addIncomeDto.getIncomeDate());
        income.setCategory(addIncomeDto.getCategory());
        income.setUser(user);

        if (addIncomeDto.getBankAccountId() != null) {
            income.setBankAccountId(addIncomeDto.getBankAccountId());
        }
        income.setPseudoIncome(addIncomeDto.getIsPseudoIncome());
        log.info("Saving income : {}", income);
        incomeRepository.save(income);
        if(!addIncomeDto.getIsPseudoIncome()) {
            BigDecimal newBalance = user.getAvailableBalance().add(income.getAmount());
            user.setAvailableBalance(newBalance);
            userRepository.save(user);
        }

        return income;
    }
}
