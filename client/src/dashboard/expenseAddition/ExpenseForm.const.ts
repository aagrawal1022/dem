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

export enum ExpenseCategory {
  Grocery = "grocery",
  Gifts = "gifts",
  Medical = "medical",
  Sports = "sports",
  Petrol = "petrol",
  Recharge = "recharege",
  Bill = "bill"
}

export const ExpenseCategoryTitle: Record<ExpenseCategory, string>={
  [ExpenseCategory.Bill]: "Utility (Electicity/Gas)",
  [ExpenseCategory.Gifts]: "Gifts",
  [ExpenseCategory.Grocery]: "Food/Grocery",
  [ExpenseCategory.Medical]: "Health/Medical",
  [ExpenseCategory.Petrol]: "Petrol/Automobile",
  [ExpenseCategory.Recharge]: "Mobile Rechrage",
  [ExpenseCategory.Sports]: "Gym/Sports"
}

export interface AddExpenseInput {
  description: String;
  paymentMethod: String;
  amount?: String | Number ;
  expenseDate?: String;
  cardId?: number;
  bankAccountId?: number;
  userId?: number;
  category: String;
}