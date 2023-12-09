import { gql } from "@apollo/client";

export const authGqls = {
  queries: {
    loginUser: gql`
      query LoginUser($userLoginDetails: LoginDetailsDto) {
        loginUser(userLoginDetails: $userLoginDetails) {
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
  },
};
