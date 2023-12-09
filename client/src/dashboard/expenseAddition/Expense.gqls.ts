import { gql } from "@apollo/client";

export const expenseGqls = {
  mutations: {
    addExpense: gql`
      mutation AddExpense($expenseDetails: AddExpenseInput) {
        addExpense(expenseDetails: $expenseDetails) {
          id
          description
          paymentMethod
          amount
          expenseDate
          card {
            id
            cardName
            lastFourDigit
            cardType
          }
          bankAccount {
            id
            bankName
            lastFourDigit
          }
        }
      }
    `,
  },
};
