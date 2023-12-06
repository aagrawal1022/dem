package com.dem.expense.service;

import com.dem.expense.constant.Constant;
import com.dem.expense.dto.CardDetailsDto;
import com.dem.expense.entity.Card;
import com.dem.expense.entity.User;
import com.dem.expense.exception.InvalidCredentialsException;
import com.dem.expense.exception.UserNotFoundException;
import com.dem.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User loginUser(String email, String password) throws InvalidCredentialsException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UserNotFoundException();
        }

        if (!password.equals(user.getPassword())) {
            throw new InvalidCredentialsException(Constant.INVALID_CREDENTIALS.toString());
        }

        return user;
    }

    public User addCardDetails(CardDetailsDto cardDetailsDto) {
        User user = userRepository.findById(cardDetailsDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException());

        Card newCard = new Card();
        newCard.setLastFourDigit(cardDetailsDto.getLastFourDigit());
        newCard.setCardType(cardDetailsDto.getCardType());
        newCard.setUser(user);
        newCard.setCardName(cardDetailsDto.getCardName());

        user.getCardDetails().add(newCard);
        userRepository.save(user);

        return user;
    }
}