import { BankAccount } from "./bankAccount";
import { Card, CardType } from "./plasticCard";

export interface User {
  id: number;
  fullName: string;
  availableBalance: number;
  cardDetails?: Card[];
  bankAccounts?: BankAccount[];
}

export const dummyUser = {
  id: 1,
  fullName: "Dummy",
  availableBalance: 50000,
  cardDetails: [
    {
      cardName: "ICICI Amazon Pay",
      lastFourDigit: 1007,
      cardType: CardType.CreditCard,
    } as Card,
    {
      cardName: "Au Bank",
      lastFourDigit: 3007,
      cardType: CardType.DebitCard,
    } as Card,
  ],
  bankAccounts: [
    { bankName: "Paytm Payment Bank", lastFourDigit: 2752 } as BankAccount,
    { bankName: "Au Small Finance Bank", lastFourDigit: 4742 } as BankAccount,
  ],
};
