import React, { useState, useEffect, useMemo, useContext } from 'react';
import { ThemeContext } from '../App.jsx';

const Stats = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  // useState: Manage stats data
  const [stats, setStats] = useState({
    sessionsCompleted: 0,
    totalTimeSpent: 0, // in minutes
    averageSessionTime: 0,
    longestStreak: 0,
    currentStreak: 0
  });

  // useEffect: Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('pomodoro-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // useEffect: Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-stats', JSON.stringify(stats));
  }, [stats]);

  // useMemo: Calculate derived statistics
  const calculatedStats = useMemo(() => {
    const sessionsCompleted = parseInt(localStorage.getItem('pomodoro-sessions') || '0');
    const totalTimeSpent = sessionsCompleted * 25; // 25 minutes per work session
    const averageSessionTime = sessionsCompleted > 0 ? 25 : 0; // Always 25 minutes for Pomodoro
    const longestStreak = parseInt(localStorage.getItem('pomodoro-longest-streak') || '0');
    const currentStreak = parseInt(localStorage.getItem('pomodoro-current-streak') || '0');

    return {
      sessionsCompleted,
      totalTimeSpent,
      averageSessionTime,
      longestStreak,
      currentStreak
    };
  }, []);

  // useMemo: Format time display
  const formattedTimeSpent = useMemo(() => {
    const hours = Math.floor(calculatedStats.totalTimeSpent / 60);
    const minutes = calculatedStats.totalTimeSpent % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [calculatedStats.totalTimeSpent]);

  // useMemo: Calculate productivity score
  const productivityScore = useMemo(() => {
    const sessions = calculatedStats.sessionsCompleted;
    if (sessions === 0) return 0;
    if (sessions < 5) return 25;
    if (sessions < 10) return 50;
    if (sessions < 20) return 75;
    return 100;
  }, [calculatedStats.sessionsCompleted]);

  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-gray-200'
    }`}>
      <h2 className="text-2xl font-bold text-center mb-6">
        📊 Your Progress
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`text-center p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="text-3xl font-bold text-green-500">
            {calculatedStats.sessionsCompleted}
          </div>
          <div className="text-sm opacity-75">Sessions</div>
        </div>
        
        <div className={`text-center p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="text-2xl font-bold text-blue-500">
            {formattedTimeSpent}
          </div>
          <div className="text-sm opacity-75">Time Spent</div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Productivity Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Productivity Score</span>
            <span className="text-sm font-bold">{productivityScore}%</span>
          </div>
          <div className={`w-full h-2 rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
              style={{ width: `${productivityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Streak Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`text-center p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div className="text-lg font-bold text-orange-500">
              {calculatedStats.currentStreak}
            </div>
            <div className="text-xs opacity-75">Current Streak</div>
          </div>
          
          <div className={`text-center p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div className="text-lg font-bold text-purple-500">
              {calculatedStats.longestStreak}
            </div>
            <div className="text-xs opacity-75">Best Streak</div>
          </div>
        </div>

        {/* Achievement Messages */}
        {calculatedStats.sessionsCompleted > 0 && (
          <div className={`p-3 rounded-lg text-center ${
            isDarkMode ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
          }`}>
            <div className="text-sm font-medium text-green-600">
              {calculatedStats.sessionsCompleted === 1 && "🎉 First session completed!"}
              {calculatedStats.sessionsCompleted === 5 && "🔥 5 sessions! You're on fire!"}
              {calculatedStats.sessionsCompleted === 10 && "⚡ 10 sessions! Consistency is key!"}
              {calculatedStats.sessionsCompleted === 25 && "🏆 25 sessions! You're a Pomodoro master!"}
              {calculatedStats.sessionsCompleted > 25 && "🌟 Keep up the amazing work!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats; 