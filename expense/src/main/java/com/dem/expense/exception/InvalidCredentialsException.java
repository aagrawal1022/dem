package com.dem.expense.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidCredentialsException extends Exception {

    public InvalidCredentialsException(String msg) {
        super(msg);
    }

}