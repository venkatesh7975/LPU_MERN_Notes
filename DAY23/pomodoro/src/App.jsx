import React, { createContext, useState, useEffect } from 'react';
import Timer from './components/Timer.jsx';
import Stats from './components/Stats.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import SessionTimer from './components/SessionTimer.jsx';

// Create ThemeContext for dark/light mode
export const ThemeContext = createContext();

function App() {
  // useState: Manage theme state (light/dark)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get theme from localStorage on initial load
    const savedTheme = localStorage.getItem('pomodoro-theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // useEffect: Persist theme changes to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-theme', JSON.stringify(isDarkMode));
    
    // Apply theme to document body for TailwindCSS dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              🍅 Pomodoro Timer
            </h1>
            <p className="text-lg opacity-75">
              Master React Hooks with a productive timer
            </p>
          </div>

          {/* Main Timer Component */}
          <div className="max-w-md mx-auto mb-8">
            <Timer />
          </div>

          {/* Stats and Controls */}
          <div className="max-w-md mx-auto space-y-4">
            <Stats />
            <div className="flex justify-center space-x-4">
              <ThemeToggle />
              <SessionTimer />
            </div>
          </div>

          {/* Footer with Hook Explanations */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className={`p-6 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200 shadow-lg'
            }`}>
              <h2 className="text-2xl font-bold mb-4 text-center">
                React Hooks Used in This App
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">useState</h3>
                  <p className="text-sm opacity-75">
                    Manages timer state, theme, and session data
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">useEffect</h3>
                  <p className="text-sm opacity-75">
                    Handles side effects like timers and localStorage
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">useContext</h3>
                  <p className="text-sm opacity-75">
                    Provides theme state across components
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">useRef</h3>
                  <p className="text-sm opacity-75">
                    Stores interval references for cleanup
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">useReducer</h3>
                  <p className="text-sm opacity-75">
                    Manages complex timer state logic
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">useMemo & useCallback</h3>
                  <p className="text-sm opacity-75">
                    Optimizes performance for calculations and handlers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App; 