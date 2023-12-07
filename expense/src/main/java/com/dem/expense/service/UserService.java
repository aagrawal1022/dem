package com.dem.expense.service;

import com.dem.expense.constant.Constant;
import com.dem.expense.dto.BankDetailsDto;
import com.dem.expense.dto.CardDetailsDto;
import com.dem.expense.entity.BankAccount;
import com.dem.expense.entity.Card;
import com.dem.expense.entity.User;
import com.dem.expense.exception.InvalidCredentialsException;
import com.dem.expense.exception.UserNotFoundException;
import com.dem.expense.repository.BankAccountRepository;
import com.dem.expense.repository.CardRepository;
import com.dem.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private BankAccountRepository bankAccountRepository;

    public User loginUser(String email, String password) throws InvalidCredentialsException, UserNotFoundException {
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

    public User addBankAccount(BankDetailsDto bankDetailsDto) {
        User user = userRepository.findById(bankDetailsDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException());

        BankAccount newBankAccount = new BankAccount();
        newBankAccount.setLastFourDigit(bankDetailsDto.getLastFourDigit());
        newBankAccount.setBankName(bankDetailsDto.getBankName());
        newBankAccount.setUser(user);

        user.getBankAccounts().add(newBankAccount);
        userRepository.save(user);

        return user;
    }


    public User removeCard(Long cardId, BigInteger userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Error("User not found"));
        Card cardToRemove = user.getCardDetails().stream()
                .filter(card -> card.getId().equals(cardId))
                .findFirst()
                .orElseThrow(() -> new Error("Card not associated with the user"));

        user.getCardDetails().remove(cardToRemove);
        cardRepository.deleteById(cardId);
        userRepository.save(user);

        return user;
    }

    public User removeBankAccount(Long accountId, BigInteger userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Error("User not found"));
        BankAccount accountToRemove = user.getBankAccounts().stream()
                .filter(card -> card.getId().equals(accountId))
                .findFirst()
                .orElseThrow(() -> new Error("Bank Account not associated with the user"));

        user.getBankAccounts().remove(accountToRemove);
        bankAccountRepository.deleteById(accountId);
        userRepository.save(user);

        return user;
    }

}