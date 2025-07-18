# 🍅 Pomodoro Timer App - React Hooks Learning Project

A comprehensive Pomodoro Timer application that demonstrates all core React Hooks in a clean, beginner-friendly way. Built with **Vite** for lightning-fast development! Perfect for teaching React concepts in the classroom.

## ✨ Features

### 🎯 Core Timer Functionality
- **25-minute work sessions** with 5-minute short breaks and 15-minute long breaks
- **Automatic mode switching** following the Pomodoro Technique
- **Start/Pause/Reset** controls with smooth animations
- **Session completion tracking** with localStorage persistence
- **Desktop notifications** when sessions complete
- **Mode selection** buttons for manual switching

### 🎨 Modern UI/UX
- **Dark/Light theme toggle** using Context API
- **Responsive design** with TailwindCSS
- **Smooth transitions** and modern animations
- **Beautiful progress indicators** and visual feedback

### 📊 Statistics & Analytics
- **Session counter** with achievement messages
- **Time spent tracking** with session timer
- **Productivity score** calculation
- **Streak tracking** for motivation

### 🔧 React Hooks Demonstration
This app showcases all core React Hooks:

| Hook | Usage | Location |
|------|-------|----------|
| `useState` | Theme state, timer data, session tracking | App.jsx, Timer.jsx, Stats.jsx |
| `useEffect` | Side effects, cleanup, localStorage | All components |
| `useContext` | Theme context across components | ThemeToggle.jsx, Timer.jsx |
| `useRef` | Interval references, cleanup | Timer.jsx, SessionTimer.jsx |
| `useReducer` | Complex timer state management | Timer.jsx |
| `useMemo` | Optimized calculations | Timer.jsx, Stats.jsx, SessionTimer.jsx |
| `useCallback` | Optimized event handlers | Timer.jsx, ThemeToggle.jsx |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd pomodoro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` (Vite will open automatically)

## 🏗️ Project Structure

```
pomodoro/
├── index.html              # Vite entry point
├── src/
│   ├── components/
│   │   ├── Timer.jsx          # Main timer with all hooks
│   │   ├── Stats.jsx          # Statistics display
│   │   ├── ThemeToggle.jsx    # Theme switching
│   │   └── SessionTimer.jsx   # Session time tracking
│   ├── App.jsx               # Root component with context
│   ├── main.jsx              # Vite entry point
│   └── index.css             # TailwindCSS styles
├── package.json
├── vite.config.js           # Vite configuration
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## ⚡ Why Vite?

- **Lightning Fast** - Instant server start and hot module replacement
- **Modern Build Tool** - Uses native ES modules for faster development
- **Optimized Production** - Rollup-based bundling for smaller builds
- **Rich Ecosystem** - Excellent plugin support and developer experience

## 🎓 Learning Objectives

### For Students
- **Understand React Hooks** through practical examples
- **Learn state management** patterns
- **Master component composition** and props
- **Practice modern React** development with Vite

### For Teachers
- **Live coding demonstration** in under 2 hours
- **Progressive complexity** from simple to advanced
- **Real-world application** of theoretical concepts
- **Interactive learning** with working timer

## 🔍 Hook Explanations

### useState
```javascript
// Manages simple state like theme toggle
const [isDarkMode, setIsDarkMode] = useState(false);
```

### useEffect
```javascript
// Handles side effects and cleanup
useEffect(() => {
  // Setup timer
  return () => {
    // Cleanup interval
  };
}, [dependencies]);
```

### useContext
```javascript
// Access shared state across components
const { isDarkMode, toggleTheme } = useContext(ThemeContext);
```

### useRef
```javascript
// Store mutable values that don't trigger re-renders
const intervalRef = useRef(null);
```

### useReducer
```javascript
// Manage complex state with actions
const [state, dispatch] = useReducer(timerReducer, initialState);
```

### useMemo
```javascript
// Optimize expensive calculations
const formattedTime = useMemo(() => {
  return formatTime(timeLeft);
}, [timeLeft]);
```

### useCallback
```javascript
// Optimize event handlers
const handleStart = useCallback(() => {
  dispatch({ type: 'START' });
}, []);
```

## 🎨 Customization

### Adding New Features
- **Custom timer durations** - Modify the 25-minute default
- **Break timers** - Add short/long break functionality
- **Sound notifications** - Add audio cues
- **Custom themes** - Extend the theme system

### Styling
- **TailwindCSS classes** for easy customization
- **Dark mode support** built-in
- **Responsive design** for all devices

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤝 Contributing

This project is designed for educational purposes. Feel free to:
- Add new features
- Improve documentation
- Fix bugs
- Enhance the UI/UX

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** for the amazing hooks API
- **Vite Team** for the lightning-fast build tool
- **TailwindCSS** for the utility-first CSS framework
- **Pomodoro Technique** for the productivity methodology

---

**Happy coding! 🚀** 