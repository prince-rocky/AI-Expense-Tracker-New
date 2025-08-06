
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6.002a2.001 2.001 0 011.806 2.66l-1.42 4.26a2.002 2.002 0 01-3.612 0L9 8z" />
                        </svg>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                            AI Expense Tracker
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
};
