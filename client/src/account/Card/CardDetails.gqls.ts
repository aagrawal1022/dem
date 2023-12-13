import { gql } from "@apollo/client";

export const cardGqls = {
  mutations: {
    removeCard: gql`
      mutation RemoveCard($cardId: Int, $userId: Int) {
        removeCard(cardId: $cardId, userId: $userId) {
          id
          fullName
          email
          availableBalance
          cardDetails {
            id
            cardName
            lastFourDigit
            cardType
          }
          bankAccounts {
            id
            bankName
            lastFourDigit
          }
        }
      }
    `,
    addCard : gql`
    mutation AddCard($cardDetails: CardDetailsDto) {
      addCard(cardDetails: $cardDetails) {
        id
        fullName
        email
        availableBalance
        cardDetails {
          id
          cardName
          lastFourDigit
          cardType
        }
        bankAccounts {
          id
          bankName
          lastFourDigit
        }
      }
    }
    `
  },
};
