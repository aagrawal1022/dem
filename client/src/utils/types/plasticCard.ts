export enum CardType {
  DebitCard = "debitCard",
  CreditCard = "creditCard",
}

export interface Card {
  cardName: string;
  cardType?: CardType;
  lastFourDigit?: number;
}

export const CardTypeTitle: Record<CardType, string> = {
    [CardType.DebitCard]: "DC",
    [CardType.CreditCard]: "CC",
  };
  