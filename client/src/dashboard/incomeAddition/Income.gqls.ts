import { gql } from "@apollo/client";

export const incomeGqls = {
  mutations: {
    addIncome: gql`
      mutation AddIncome($incomeDetails: IncomeInput) {
        addIncome(incomeDetails: $incomeDetails) {
          id
          description
          amount
          incomeDate
          category
        }
      }
    `,
  },
};
