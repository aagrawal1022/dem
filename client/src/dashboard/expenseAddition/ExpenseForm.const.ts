export enum PaymentMethod {
  Cash = "cash",
  Card = "card",
  UPI = "upi",
}

export const PaymentMethodTitle: Record<PaymentMethod, string> = {
  [PaymentMethod.Cash]: "Cash",
  [PaymentMethod.Card]: "Card", //todo: add CC/DC option also
  [PaymentMethod.UPI]: "UPI",
};
