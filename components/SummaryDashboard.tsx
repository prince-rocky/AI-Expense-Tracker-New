
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense, ExpenseCategory } from '../types';
import { CATEGORIES, CATEGORY_COLORS } from '../constants';

interface SummaryDashboardProps {
  expenses: Expense[];
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ expenses }) => {
  const { totalExpenses, categoryData } = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const data = CATEGORIES.map(category => ({
      name: category,
      value: expenses
        .filter(e => e.category === category)
        .reduce((sum, e) => sum + e.amount, 0),
    })).filter(item => item.value > 0);

    return { totalExpenses: total, categoryData: data };
  }, [expenses]);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg">
          <p className="font-bold text-slate-800 dark:text-slate-100">{`${payload[0].name}`}</p>
          <p className="text-sm text-brand-primary font-semibold">{`$${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 h-full">
      <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Spending Summary</h2>
      
      <div className="mb-6 p-6 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl text-white shadow-inner">
        <p className="text-lg opacity-80">Total Expenses</p>
        <p className="text-4xl font-extrabold tracking-tight">
          ${totalExpenses.toFixed(2)}
        </p>
      </div>

      <h3 className="text-lg font-bold mb-4 text-slate-700 dark:text-slate-200">By Category</h3>
      
      <div style={{ width: '100%', height: 350 }}>
        {categoryData.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as ExpenseCategory]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconSize={10} wrapperStyle={{fontSize: "0.875rem"}}/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
            <img src="https://picsum.photos/seed/chart/300/150" alt="A blank chart" className="mx-auto rounded-lg mb-4 opacity-50"/>
            <p>No data to display.</p>
            <p className="text-sm">Add some expenses to see your summary.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDashboard;
