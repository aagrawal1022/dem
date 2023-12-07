package com.dem.expense.resolvers;

import com.dem.expense.dto.AddExpenseDto;
import com.dem.expense.entity.Expense;
import com.dem.expense.entity.User;
import com.dem.expense.service.ExpenseService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class ExpenseResolver {

    @Autowired
    private ExpenseService expenseService;

    @MutationMapping
    public Expense addExpense(@Argument("expenseDetails") AddExpenseDto addExpenseDto) {
        return expenseService.addExpense(addExpenseDto);
    }

}
