package com.dem.expense.resolvers;

import com.dem.expense.dto.AddIncomeDto;
import com.dem.expense.entity.Income;
import com.dem.expense.service.IncomeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
@Slf4j
public class IncomeResolver {

    @Autowired
    private IncomeService incomeService;

    @MutationMapping
    public Income addIncome(@Argument("incomeDetails")AddIncomeDto addIncomeDto){
        return this.incomeService.addIncome(addIncomeDto);
    }

}
