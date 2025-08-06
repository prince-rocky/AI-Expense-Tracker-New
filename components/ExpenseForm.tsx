
import React, { useState } from 'react';
import { PlusIcon, SpinnerIcon, SparklesIcon } from './icons';
import { ExpenseCategory } from '../types';
import { CATEGORIES } from '../constants';

interface ExpenseFormProps {
  onAddExpense: (description: string, amount: number, category: ExpenseCategory | null) => void;
  isLoading: boolean;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, isLoading }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [manualCategory, setManualCategory] = useState<ExpenseCategory | ''>('');
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setManualCategory('');
    setError(null);
  };
  
  const validateFields = () => {
    const parsedAmount = parseFloat(amount);
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid description and a positive amount.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleManualAdd = () => {
    if (!manualCategory) {
        setError('Please select a category for manual entry.');
        return;
    }
    if (validateFields()) {
      onAddExpense(description, parseFloat(amount), manualCategory);
      resetForm();
    }
  };

  const handleSmartAdd = () => {
    if (validateFields()) {
      onAddExpense(description, parseFloat(amount), null);
      resetForm();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Add New Expense</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee with team"
            className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition"
            required
            aria-label="Expense Description"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 4.50"
            className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition"
            required
            step="0.01"
            aria-label="Expense Amount"
          />
        </div>
        
        {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
        
        <div className="space-y-3 pt-2">
            <button
                type="button"
                onClick={handleSmartAdd}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
            {isLoading ? (
                <>
                <SpinnerIcon />
                Categorizing...
                </>
            ) : (
                <>
                <SparklesIcon />
                Smart Categorize & Add
                </>
            )}
            </button>
            
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-400 dark:text-slate-500 uppercase">Or</span>
                <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
            </div>

            <div>
              <label htmlFor="manual-category" className="sr-only">Manual Category</label>
              <select
                id="manual-category"
                value={manualCategory}
                onChange={(e) => setManualCategory(e.target.value as ExpenseCategory)}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none transition"
                >
                <option value="" disabled>Select a category...</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <button
                type="button"
                onClick={handleManualAdd}
                disabled={isLoading || !manualCategory}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
                <PlusIcon />
                Add Manually
            </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
