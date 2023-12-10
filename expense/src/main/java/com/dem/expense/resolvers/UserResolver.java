package com.dem.expense.resolvers;

import com.dem.expense.dto.BankDetailsDto;
import com.dem.expense.dto.CardDetailsDto;
import com.dem.expense.dto.LoginDetailsDto;
import com.dem.expense.entity.User;
import com.dem.expense.exception.InvalidCredentialsException;
import com.dem.expense.exception.UserNotFoundException;
import com.dem.expense.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigInteger;

@Controller
@AllArgsConstructor
@Slf4j
public class UserResolver {

    @Autowired
    private UserService userService;

    @QueryMapping
    public User loginUser(@Argument("userLoginDetails") LoginDetailsDto loginDetailsDto) throws InvalidCredentialsException, UserNotFoundException {
        log.debug("Got Login user with email {}",loginDetailsDto.getEmail());
        return userService.loginUser(loginDetailsDto.getEmail(), loginDetailsDto.getPassword());
    }

    @MutationMapping
    public User addCardDetails(@Argument("cardDetails") CardDetailsDto cardDetailsDto) {
        return userService.addCardDetails(cardDetailsDto);
    }

    @MutationMapping
    public User addBankAccount(@Argument("bankDetails") BankDetailsDto bankDetailsDto) {
        return userService.addBankAccount(bankDetailsDto);
    }
    @MutationMapping
    public User removeCard(@Argument("cardId") Long  cardId, @Argument("userId")BigInteger userId) {
        return userService.removeCard(cardId, userId);
    }
    @MutationMapping
    public User removeBankAccount(@Argument("accountId") Long  accountId, @Argument("userId") BigInteger userId) {
        return userService.removeBankAccount(accountId, userId);
    }

}