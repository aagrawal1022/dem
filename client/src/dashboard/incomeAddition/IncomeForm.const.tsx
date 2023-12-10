export enum IncomeCategory {
  Salary = "salary",
  Bonus = "bonus",
  Interest = "interest",
  Other = "other",
}

export const IncomeCategoryTitle: Record<IncomeCategory, string> = {
  [IncomeCategory.Salary]: "Salary",
  [IncomeCategory.Bonus]: "Bonus",
  [IncomeCategory.Interest]: "Interest",
  [IncomeCategory.Other]: "Other",
};

export enum OtherIncomeCategory {
  ProvidentFund = "providentFund",
  IncomeTax = "incomeTax",
}

export const OtherIncomeCategoryTitle: Record<OtherIncomeCategory, string> = {
  [OtherIncomeCategory.ProvidentFund]: "Provident Fund",
  [OtherIncomeCategory.IncomeTax]: "Income Tax (TDS)",
};

export interface AddIncomeInput {
  description: String;
  amount: unknown ;
  expenseDate?: String;
  bankAccountId?: number;
  userId?: number;
  category: String;
  isPseudoIncome: boolean;
}