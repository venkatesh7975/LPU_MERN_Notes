import React, { useContext, useCallback } from 'react';
import { ThemeContext } from '../App.jsx';

const ThemeToggle = () => {
  // useContext: Access theme context from parent component
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // useCallback: Optimize the click handler
  const handleToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isDarkMode
          ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
          : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm'
      }`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for light mode */}
      {isDarkMode ? (
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m6.01-6.01l.707-.707m12.728 12.728l.707.707M6.343 6.343l-.707-.707m12.728-.707l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      )}
      
      <span className="text-sm">
        {isDarkMode ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default ThemeToggle; 