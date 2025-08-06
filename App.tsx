
import React, { useState, useCallback, useEffect } from 'react';
import { Expense, ExpenseCategory } from './types';
import { categorizeExpense } from './services/geminiService';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryDashboard from './components/SummaryDashboard';
import { Header } from './components/Header';
import { ErrorBanner } from './components/ErrorBanner';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const savedExpenses = localStorage.getItem('expenses');
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    } catch (error) {
      console.error("Failed to parse expenses from localStorage", error);
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error("Failed to save expenses to localStorage", error);
    }
  }, [expenses]);

  const handleAddExpense = useCallback(async (description: string, amount: number, category: ExpenseCategory | null) => {
    setError(null);

    // Smart categorization path
    if (category === null) {
      setIsLoading(true);
      try {
        const aiCategory = await categorizeExpense(description);
        const newExpense: Expense = {
          id: crypto.randomUUID(),
          description,
          amount,
          category: aiCategory,
          date: new Date().toISOString(),
        };
        setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
      } catch (err) {
        console.error(err);
        setError('Failed to categorize expense. Please try again or add it manually.');
      } finally {
        setIsLoading(false);
      }
    } else { // Manual categorization path
      const newExpense: Expense = {
        id: crypto.randomUUID(),
        description,
        amount,
        category: category,
        date: new Date().toISOString(),
      };
      setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    }
  }, []);

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ExpenseForm onAddExpense={handleAddExpense} isLoading={isLoading} />
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </div>
          <div className="lg:col-span-2">
            <SummaryDashboard expenses={expenses} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
