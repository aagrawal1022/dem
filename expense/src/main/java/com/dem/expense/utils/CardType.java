package com.dem.expense.utils;

public enum CardType {
    DEBIT_CARD("debitCard"),
    CREDIT_CARD("creditCard");

    private String message;

    private CardType(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return message;
    }
}
