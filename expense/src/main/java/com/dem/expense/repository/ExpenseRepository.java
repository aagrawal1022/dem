package com.dem.expense.repository;

import com.dem.expense.entity.BankAccount;
import com.dem.expense.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
