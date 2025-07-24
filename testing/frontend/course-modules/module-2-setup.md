# Module 2: Setting Up Jest & React Testing Library

## 🎯 Learning Objectives
- Install and configure Jest for React testing
- Set up React Testing Library
- Configure Vite for testing
- Understand the testing environment setup
- Create proper folder structure for tests

## 🛠️ Installation & Setup

### Step 1: Check Current Dependencies

Our project already has the necessary dependencies! Let's verify:

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "jsdom": "^26.1.0",
    "vitest": "^3.2.4"
  }
}
```

### Step 2: Configure Vite for Testing

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
})
```

### Step 3: Verify setupTests.js

Our `src/setupTests.js` is already configured:

```javascript
import '@testing-library/jest-dom';
```

This gives us access to custom matchers like:
- `toBeInTheDocument()`
- `toHaveClass()`
- `toBeVisible()`
- `toHaveValue()`

## 📁 Folder Structure

Let's organize our testing structure:

```
src/
├── components/           # React components
│   ├── Counter.jsx
│   ├── TodoList.jsx
│   └── LoginForm.jsx
├── __tests__/           # Unit tests
│   ├── components/
│   │   ├── Counter.test.jsx
│   │   ├── TodoList.test.jsx
│   │   └── LoginForm.test.jsx
│   └── utils/
│       └── helpers.test.js
├── utils/               # Utility functions
│   └── helpers.js
└── setupTests.js        # Test setup
```

## 🧪 Testing Environment Explained

### What is jsdom?
- A JavaScript implementation of DOM and HTML standards
- Allows us to test React components in a Node.js environment
- Simulates browser APIs without needing a real browser

### React Testing Library Philosophy
- **"The more your tests resemble the way your software is used, the more confidence they can give you."**
- Focus on user behavior, not implementation details
- Test components the way users interact with them

## 🎯 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended for development)
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Counter.test.jsx

# Run tests matching a pattern
npm test -- --testNamePattern="Counter"
```

### Test Output Explanation

```
 PASS  src/__tests__/Greeting.test.jsx
  Greeting Component
    ✓ renders default greeting (15 ms)
    ✓ renders custom greeting (3 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.234 s
```

## 🎯 Interactive Exercise: Setting Up Your First Test Suite

Let's create a more complex component and test it properly!

### Step 1: Create a Counter Component

Create `src/components/Counter.jsx`:

```jsx
import React, { useState } from 'react';

const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
```

### Step 2: Write Comprehensive Tests

Create `src/__tests__/Counter.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

describe('Counter Component', () => {
  test('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText('Counter: 5')).toBeInTheDocument();
  });

  test('renders with default value of 0', () => {
    render(<Counter />);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  test('increments counter when increment button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
  });

  test('decrements counter when decrement button is clicked', () => {
    render(<Counter initialValue={5} />);
    fireEvent.click(screen.getByText('Decrement'));
    expect(screen.getByText('Counter: 4')).toBeInTheDocument();
  });

  test('resets counter to initial value when reset button is clicked', () => {
    render(<Counter initialValue={10} />);
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('Counter: 10')).toBeInTheDocument();
  });
});
```

## 🎯 Test Configuration Best Practices

### 1. Test File Naming
```javascript
// ✅ Good naming conventions
ComponentName.test.jsx
ComponentName.spec.jsx
__tests__/ComponentName.jsx
```

### 2. Test Organization
```javascript
describe('Component Name', () => {
  // Group related tests
  describe('when user clicks button', () => {
    test('should increment counter', () => {
      // test implementation
    });
  });

  describe('when user enters invalid input', () => {
    test('should show error message', () => {
      // test implementation
    });
  });
});
```

### 3. Test Data Setup
```javascript
describe('UserProfile', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  };

  test('displays user information', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## 🎯 Checkpoint Quiz

### Question 1: What is jsdom used for in testing?
- A) To run tests faster
- B) To simulate browser APIs in Node.js environment
- C) To make tests more reliable
- D) To reduce test file size

**Answer: B** - jsdom simulates browser APIs so we can test React components in Node.js.

### Question 2: What should be the focus of React Testing Library tests?
- A) Implementation details
- B) User behavior and interactions
- C) Internal state
- D) Performance metrics

**Answer: B** - React Testing Library focuses on testing how users interact with your components.

### Question 3: Which command runs tests in watch mode?
- A) `npm test`
- B) `npm test -- --watch`
- C) `npm test --watch`
- D) `npm run test:watch`

**Answer: B** - `npm test -- --watch` runs tests in watch mode for development.

## 🚀 Practice Exercise

**Your Turn!** Create a `TodoItem` component and write comprehensive tests:

1. Create a `TodoItem` component with:
   - Display todo text
   - Toggle completion status
   - Delete functionality
   - Edit functionality

2. Write tests for:
   - Rendering with different props
   - Toggling completion
   - Deleting items
   - Editing items
   - Edge cases (empty text, long text)

**Bonus Challenge**: Add due date functionality and test date formatting.

## 📝 Module Summary

In this module, you learned:
- ✅ How to configure Jest and React Testing Library with Vite
- ✅ Understanding the testing environment (jsdom)
- ✅ Proper folder structure for tests
- ✅ Running tests with different commands
- ✅ Writing comprehensive test suites
- ✅ Best practices for test organization

## 🎯 Next Steps

In the next module, we'll dive deeper into writing unit tests and explore common testing patterns and matchers.

---

**Ready for Module 3? Let's write more sophisticated unit tests! 🚀** 