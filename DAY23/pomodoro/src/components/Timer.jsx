import React, { useState, useEffect, useReducer, useRef, useMemo, useCallback, useContext } from 'react';
import { ThemeContext } from '../App.jsx';

// useReducer: Manage complex timer state
const timerReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true, isPaused: false };
    case 'PAUSE':
      return { ...state, isRunning: false, isPaused: true };
    case 'RESET':
      return { 
        ...state, 
        timeLeft: state.currentMode === 'work' ? 25 * 60 : 
                  state.currentMode === 'shortBreak' ? 5 * 60 : 15 * 60,
        isRunning: false, 
        isPaused: false 
      };
    case 'TICK':
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1)
      };
    case 'COMPLETE':
      const newSessionsCompleted = state.currentMode === 'work' ? 
        state.sessionsCompleted + 1 : state.sessionsCompleted;
      
      // Determine next mode
      let nextMode = state.currentMode;
      if (state.currentMode === 'work') {
        nextMode = state.sessionsCompleted % 4 === 3 ? 'longBreak' : 'shortBreak';
      } else {
        nextMode = 'work';
      }
      
      return {
        ...state,
        isRunning: false,
        isPaused: false,
        sessionsCompleted: newSessionsCompleted,
        currentMode: nextMode,
        timeLeft: nextMode === 'work' ? 25 * 60 : 
                  nextMode === 'shortBreak' ? 5 * 60 : 15 * 60
      };
    case 'SWITCH_MODE':
      return {
        ...state,
        currentMode: action.payload,
        timeLeft: action.payload === 'work' ? 25 * 60 : 
                  action.payload === 'shortBreak' ? 5 * 60 : 15 * 60,
        isRunning: false,
        isPaused: false
      };
    case 'RESET_STATS':
      return {
        ...state,
        sessionsCompleted: 0
      };
    case 'LOAD_SESSIONS':
      return {
        ...state,
        sessionsCompleted: action.payload
      };
    default:
      return state;
  }
};

const Timer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  // useReducer: Manage complex timer state
  const [state, dispatch] = useReducer(timerReducer, {
    timeLeft: 25 * 60, // 25 minutes in seconds
    isRunning: false,
    isPaused: false,
    sessionsCompleted: 0,
    currentMode: 'work' // work, shortBreak, longBreak
  });

  // useRef: Store interval reference for cleanup
  const intervalRef = useRef(null);

  // useEffect: Handle timer logic and cleanup
  useEffect(() => {
    if (state.isRunning && state.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    } else if (state.timeLeft === 0 && state.isRunning) {
      dispatch({ type: 'COMPLETE' });
      
      // Show appropriate notification based on mode
      const notificationTitle = state.currentMode === 'work' ? 'Work Session Complete!' :
                              state.currentMode === 'shortBreak' ? 'Short Break Complete!' :
                              'Long Break Complete!';
      
      const notificationBody = state.currentMode === 'work' ? 'Great job! Time for a break.' :
                              state.currentMode === 'shortBreak' ? 'Short break over. Ready to work?' :
                              'Long break over. Ready for the next cycle?';
      
      if (Notification.permission === 'granted') {
        new Notification(notificationTitle, {
          body: notificationBody,
          icon: '🍅'
        });
      } else if (Notification.permission === 'default') {
        // Request permission for notifications
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(notificationTitle, {
              body: notificationBody,
              icon: '🍅'
            });
          }
        });
      }
    }

    // Cleanup function to clear interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.timeLeft]);

  // useEffect: Load saved sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('pomodoro-sessions');
    if (savedSessions) {
      const sessions = parseInt(savedSessions);
      if (sessions > 0) {
        // Set the sessions completed count directly
        dispatch({ type: 'LOAD_SESSIONS', payload: sessions });
      }
    }
  }, []);

  // useEffect: Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-sessions', state.sessionsCompleted.toString());
  }, [state.sessionsCompleted]);

  // useMemo: Optimize time formatting calculation
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [state.timeLeft]);

  // useMemo: Calculate progress percentage
  const progressPercentage = useMemo(() => {
    const totalTime = state.currentMode === 'work' ? 25 * 60 : 
                      state.currentMode === 'shortBreak' ? 5 * 60 : 15 * 60;
    return ((totalTime - state.timeLeft) / totalTime) * 100;
  }, [state.timeLeft, state.currentMode]);

  // useCallback: Optimize event handlers
  const handleStart = useCallback(() => {
    dispatch({ type: 'START' });
  }, []);

  const handlePause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const handleResetStats = useCallback(() => {
    localStorage.removeItem('pomodoro-sessions');
    // Reset sessions count by dispatching a special reset action
    dispatch({ type: 'RESET_STATS' });
  }, []);

  return (
    <div className={`p-8 rounded-2xl shadow-xl ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-gray-200'
    }`}>
      {/* Timer Display */}
      <div className="text-center mb-8">
        <div className="relative mb-6">
          {/* Progress Circle */}
          <div className="w-64 h-64 mx-auto relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isDarkMode ? '#374151' : '#e5e7eb'}
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={state.currentMode === 'work' ? '#ef4444' : 
                        state.currentMode === 'shortBreak' ? '#10b981' : '#3b82f6'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            
            {/* Timer text overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-6xl font-mono font-bold ${
                  state.currentMode === 'work' ? 'text-red-500' : 
                  state.currentMode === 'shortBreak' ? 'text-green-500' : 'text-blue-500'
                }`}>
                  {formattedTime}
                </div>
                <div className={`text-lg mt-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {state.isRunning ? 
                    (state.currentMode === 'work' ? 'Working...' : 
                     state.currentMode === 'shortBreak' ? 'Short Break...' : 'Long Break...') : 
                    state.isPaused ? 'Paused' : 
                    (state.currentMode === 'work' ? 'Ready to Work' : 
                     state.currentMode === 'shortBreak' ? 'Short Break' : 'Long Break')}
                </div>
                <div className={`text-sm mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {state.currentMode === 'work' ? 'Focus Time' : 
                   state.currentMode === 'shortBreak' ? 'Quick Rest' : 'Extended Rest'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => dispatch({ type: 'SWITCH_MODE', payload: 'work' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              state.currentMode === 'work'
                ? (isDarkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white')
                : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            Work
          </button>
          <button
            onClick={() => dispatch({ type: 'SWITCH_MODE', payload: 'shortBreak' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              state.currentMode === 'shortBreak'
                ? (isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white')
                : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => dispatch({ type: 'SWITCH_MODE', payload: 'longBreak' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              state.currentMode === 'longBreak'
                ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          {!state.isRunning ? (
            <button
              onClick={handleStart}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              Pause
            </button>
          )}
          
          <button
            onClick={handleReset}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isDarkMode
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Session Info */}
      <div className={`text-center p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <div className="text-sm opacity-75 mb-1">Work Sessions Completed</div>
        <div className="text-2xl font-bold">{state.sessionsCompleted}</div>
        
        {/* Pomodoro Cycle Indicator */}
        {state.currentMode === 'work' && (
          <div className="mt-2">
            <div className="text-xs opacity-75 mb-1">Current Cycle</div>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4].map((session) => (
                <div
                  key={session}
                  className={`w-3 h-3 rounded-full ${
                    session <= (state.sessionsCompleted % 4) + 1
                      ? (isDarkMode ? 'bg-red-500' : 'bg-red-400')
                      : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')
                  }`}
                />
              ))}
            </div>
            <div className="text-xs mt-1 opacity-75">
              Session {((state.sessionsCompleted % 4) + 1)} of 4
            </div>
          </div>
        )}
        
        <button
          onClick={handleResetStats}
          className={`mt-3 px-4 py-2 text-sm rounded ${
            isDarkMode
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          Reset Stats
        </button>
      </div>
    </div>
  );
};

export default Timer; 