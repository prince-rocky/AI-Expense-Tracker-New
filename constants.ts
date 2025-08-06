
import { ExpenseCategory } from './types';

export const CATEGORIES = Object.values(ExpenseCategory);

export const CATEGORY_COLORS: { [key in ExpenseCategory]: string } = {
    [ExpenseCategory.Food]: '#ef4444',          // red-500
    [ExpenseCategory.Transport]: '#f97316',   // orange-500
    [ExpenseCategory.Shopping]: '#8b5cf6',     // violet-500
    [ExpenseCategory.Utilities]: '#3b82f6',    // blue-500
    [ExpenseCategory.Entertainment]: '#ec4899',// pink-500
    [ExpenseCategory.Health]: '#10b981',       // emerald-500
    [ExpenseCategory.Housing]: '#eab308',      // yellow-500
    [ExpenseCategory.Education]: '#0ea5e9',     // sky-500
    [ExpenseCategory.Other]: '#64748b',        // slate-500
};
