
import React from 'react';
import { Expense, ExpenseCategory } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { TrashIcon, CategoryIcon } from './icons';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  const categoryColor = CATEGORY_COLORS[expense.category] || '#64748b';

  return (
    <li className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div style={{ backgroundColor: categoryColor }} className="w-10 h-10 rounded-full flex items-center justify-center text-white">
          <CategoryIcon category={expense.category} />
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-slate-800 dark:text-slate-100">{expense.description}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {new Date(expense.date).toLocaleDateString()} &bull; {expense.category}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-lg text-slate-900 dark:text-slate-50">
          ${expense.amount.toFixed(2)}
        </p>
        <button
          onClick={() => onDelete(expense.id)}
          className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
          aria-label="Delete expense"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Recent Transactions</h2>
      {expenses.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <img src="https://picsum.photos/seed/empty/400/200" alt="An empty notepad" className="mx-auto rounded-lg mb-4 opacity-50"/>
            <p>No expenses yet. Add one above to get started!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={onDeleteExpense} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
