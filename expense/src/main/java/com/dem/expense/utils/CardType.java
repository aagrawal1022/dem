package com.dem.expense.utils;

public enum CardType {
    DEBIT_CARD("debitCard"),
    CREDIT_CARD("creditCard");

    private String value;

    CardType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
