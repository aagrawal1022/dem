export enum CardType {
  DebitCard = "DEBIT_CARD",
  CreditCard = "CREDIT_CARD",
}

export interface Card {
  id: number;
  cardName: string;
  cardType?: CardType;
  lastFourDigit?: number;
}

export const CardTypeTitle: Record<CardType, string> = {
    [CardType.DebitCard]: "DC",
    [CardType.CreditCard]: "CC",
  };
  