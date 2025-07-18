import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { ThemeContext } from '../App.jsx';

const SessionTimer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  // useState: Track session time
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // useRef: Store interval reference for cleanup
  const intervalRef = useRef(null);
  
  // useRef: Store start time reference
  const startTimeRef = useRef(Date.now());

  // useEffect: Handle session timer logic
  useEffect(() => {
    if (isActive) {
      // Start the timer
      intervalRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);

      // Save start time to localStorage
      const savedStartTime = localStorage.getItem('pomodoro-session-start');
      if (!savedStartTime) {
        localStorage.setItem('pomodoro-session-start', startTimeRef.current.toString());
      }
    } else {
      // Clear interval when inactive
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  // useEffect: Load saved session time on mount
  useEffect(() => {
    const savedStartTime = localStorage.getItem('pomodoro-session-start');
    if (savedStartTime) {
      const startTime = parseInt(savedStartTime);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSessionTime(elapsed);
    }
  }, []);

  // useEffect: Save session time to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-session-time', sessionTime.toString());
  }, [sessionTime]);

  // useEffect: Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // useMemo: Format session time display
  const formattedSessionTime = useMemo(() => {
    const hours = Math.floor(sessionTime / 3600);
    const minutes = Math.floor((sessionTime % 3600) / 60);
    const seconds = sessionTime % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [sessionTime]);

  // useMemo: Calculate session progress
  const sessionProgress = useMemo(() => {
    // Calculate progress based on time spent (max 4 hours = 14400 seconds)
    const maxTime = 14400; // 4 hours
    return Math.min((sessionTime / maxTime) * 100, 100);
  }, [sessionTime]);

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
      isDarkMode
        ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
        : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm'
    }`}>
      {/* Clock icon */}
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      
      <div className="flex flex-col">
        <span className="text-sm font-mono">
          {formattedSessionTime}
        </span>
        <div className="w-full h-1 bg-gray-300 rounded-full">
          <div 
            className="h-1 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${sessionProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimer; 