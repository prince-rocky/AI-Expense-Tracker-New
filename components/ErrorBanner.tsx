
import React from 'react';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-6 rounded-r-lg flex justify-between items-center" role="alert">
      <div>
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
      <button onClick={onDismiss} className="p-1 rounded-full hover:bg-red-200 dark:hover:bg-red-800" aria-label="Dismiss error">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
