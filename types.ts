
export enum ExpenseCategory {
  Food = 'Food',
  Transport = 'Transport',
  Shopping = 'Shopping',
  Utilities = 'Utilities',
  Entertainment = 'Entertainment',
  Health = 'Health',
  Housing = 'Housing',
  Education = 'Education',
  Other = 'Other',
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}
