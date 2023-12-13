import { CardType } from "utils/types/plasticCard";

export const CardTypeTitle: Record<CardType, string> = {
  [CardType.CreditCard]: "Credit",
  [CardType.DebitCard]: "Debit",
};

export interface AddCardDetails {
  cardName: string;
  lastFourDigit?: number;
  cardType: CardType;
  userId?: number;
}
