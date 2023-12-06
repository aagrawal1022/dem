package com.dem.expense.resolvers;

import com.dem.expense.dto.CardDetailsDto;
import com.dem.expense.dto.LoginDetailsDto;
import com.dem.expense.entity.User;
import com.dem.expense.exception.InvalidCredentialsException;
import com.dem.expense.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class UserResolver {

    @Autowired
    private UserService userService;

    @QueryMapping
    public User loginUser(@Argument("userLoginDetails") LoginDetailsDto loginDetailsDto) throws InvalidCredentialsException {
        return userService.loginUser(loginDetailsDto.getEmail(), loginDetailsDto.getPassword());
    }

    @MutationMapping
    public User addCardDetails(@Argument("cardDetails") CardDetailsDto cardDetailsDto) {
        return userService.addCardDetails(cardDetailsDto);
    }
}