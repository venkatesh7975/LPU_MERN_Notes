# Module 4: Common Matchers

## 🎯 Learning Objectives
- Master essential Jest matchers for assertions
- Learn React Testing Library specific matchers
- Understand when to use different matchers
- Practice with real-world examples
- Learn advanced matcher combinations

## 🧪 Essential Jest Matchers

### 1. Equality Matchers

```javascript
// Exact equality
expect(value).toBe(expected);
expect(2 + 2).toBe(4);

// Deep equality for objects/arrays
expect(value).toEqual(expected);
expect([1, 2, 3]).toEqual([1, 2, 3]);
expect({ name: 'John', age: 30 }).toEqual({ name: 'John', age: 30 });

// Object property matching
expect(value).toMatchObject(expected);
expect({ name: 'John', age: 30, city: 'NYC' }).toMatchObject({ name: 'John', age: 30 });
```

### 2. Truthiness Matchers

```javascript
// Check if value is truthy
expect(value).toBeTruthy();
expect(1).toBeTruthy();
expect('hello').toBeTruthy();

// Check if value is falsy
expect(value).toBeFalsy();
expect(0).toBeFalsy();
expect('').toBeFalsy();
expect(null).toBeFalsy();
expect(undefined).toBeFalsy();

// Check for null/undefined specifically
expect(value).toBeNull();
expect(value).toBeUndefined();
```

### 3. Number Matchers

```javascript
// Greater than
expect(value).toBeGreaterThan(expected);
expect(5).toBeGreaterThan(3);

// Less than
expect(value).toBeLessThan(expected);
expect(2).toBeLessThan(5);

// Greater than or equal
expect(value).toBeGreaterThanOrEqual(expected);
expect(5).toBeGreaterThanOrEqual(5);

// Less than or equal
expect(value).toBeLessThanOrEqual(expected);
expect(3).toBeLessThanOrEqual(5);

// Close to (for floating point)
expect(value).toBeCloseTo(expected, precision);
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
```

### 4. String Matchers

```javascript
// Contains substring
expect(value).toContain(expected);
expect('Hello World').toContain('World');

// Match regex
expect(value).toMatch(regex);
expect('Hello World').toMatch(/World/);

// Start with
expect(value).toMatch(/^Hello/);
expect('Hello World').toMatch(/^Hello/);

// End with
expect(value).toMatch(/World$/);
expect('Hello World').toMatch(/World$/);
```

### 5. Array Matchers

```javascript
// Contains element
expect(array).toContain(element);
expect([1, 2, 3]).toContain(2);

// Contains all elements
expect(array).toEqual(expect.arrayContaining([1, 2]));
expect([1, 2, 3, 4]).toEqual(expect.arrayContaining([1, 2]));

// Array length
expect(array).toHaveLength(expected);
expect([1, 2, 3]).toHaveLength(3);

// Empty array
expect(array).toEqual([]);
expect([]).toHaveLength(0);
```

## 🎯 React Testing Library Specific Matchers

### 1. Element Presence

```javascript
// Element is in document
expect(element).toBeInTheDocument();

// Element is not in document
expect(element).not.toBeInTheDocument();

// Element is visible
expect(element).toBeVisible();

// Element is hidden
expect(element).not.toBeVisible();
```

### 2. Form Element Matchers

```javascript
// Input value
expect(input).toHaveValue(expected);
expect(screen.getByRole('textbox')).toHaveValue('hello');

// Checkbox checked
expect(checkbox).toBeChecked();
expect(screen.getByRole('checkbox')).toBeChecked();

// Radio button checked
expect(radio).toBeChecked();
expect(screen.getByRole('radio')).toBeChecked();

// Element disabled
expect(element).toBeDisabled();
expect(screen.getByRole('button')).toBeDisabled();

// Element enabled
expect(element).toBeEnabled();
expect(screen.getByRole('button')).toBeEnabled();
```

### 3. CSS Class Matchers

```javascript
// Has specific class
expect(element).toHaveClass(className);
expect(button).toHaveClass('button--primary');

// Has multiple classes
expect(element).toHaveClass(class1, class2);
expect(button).toHaveClass('button', 'button--primary');

// Does not have class
expect(element).not.toHaveClass(className);
expect(button).not.toHaveClass('button--disabled');
```

## 🎯 Interactive Exercise: Testing a Form Component

Let's create a form component and test it with various matchers!

### Step 1: Create a Login Form Component

Create `src/components/LoginForm.jsx`:

```jsx
import React, { useState } from 'react';

const LoginForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          data-testid="email-input"
        />
        {errors.email && (
          <span className="error" data-testid="email-error">
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          data-testid="password-input"
        />
        {errors.password && (
          <span className="error" data-testid="password-error">
            {errors.password}
          </span>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            data-testid="remember-checkbox"
          />
          Remember me
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        data-testid="submit-button"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
```

### Step 2: Write Comprehensive Tests with Matchers

Create `src/__tests__/LoginForm.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe('LoginForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  // Test rendering
  test('renders all form elements', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('remember-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('renders with default values', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByTestId('email-input')).toHaveValue('');
    expect(screen.getByTestId('password-input')).toHaveValue('');
    expect(screen.getByTestId('remember-checkbox')).not.toBeChecked();
  });

  // Test user interactions
  test('updates email input when user types', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('updates password input when user types', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput).toHaveValue('password123');
  });

  test('toggles remember me checkbox', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const checkbox = screen.getByTestId('remember-checkbox');
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // Test validation
  test('shows error when email is empty', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
  });

  test('shows error when email is invalid', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is invalid');
  });

  test('shows error when password is too short', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 6 characters');
  });

  // Test successful submission
  test('calls onSubmit with form data when valid', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const checkbox = screen.getByTestId('remember-checkbox');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(checkbox);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true
    });
  });

  // Test loading state
  test('shows loading state when isLoading is true', () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Logging in...');
  });

  test('shows normal state when isLoading is false', () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeEnabled();
    expect(submitButton).toHaveTextContent('Login');
  });

  // Test error clearing
  test('clears error when user starts typing', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    // Trigger error
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    
    // Start typing
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test' } });
    
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
  });
});
```

## 🎯 Advanced Matcher Combinations

### 1. Partial Object Matching

```javascript
test('submits form with correct data structure', () => {
  const mockOnSubmit = jest.fn();
  render(<LoginForm onSubmit={mockOnSubmit} />);
  
  // Fill form and submit
  fireEvent.change(screen.getByTestId('email-input'), { 
    target: { value: 'test@example.com' } 
  });
  fireEvent.click(screen.getByTestId('submit-button'));
  
  expect(mockOnSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      email: 'test@example.com',
      password: expect.any(String)
    })
  );
});
```

### 2. Array Matching

```javascript
test('returns array with expected items', () => {
  const result = getTodoItems();
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: 1, text: 'Learn Testing' }),
      expect.objectContaining({ id: 2, text: 'Write Tests' })
    ])
  );
});
```

### 3. String Pattern Matching

```javascript
test('displays formatted date', () => {
  render(<DateDisplay date={new Date('2023-01-15')} />);
  expect(screen.getByText(/January 15, 2023/)).toBeInTheDocument();
});
```

## 🎯 Checkpoint Quiz

### Question 1: Which matcher is best for comparing objects?
- A) `toBe()`
- B) `toEqual()`
- C) `toMatch()`
- D) `toContain()`

**Answer: B** - `toEqual()` performs deep equality comparison for objects.

### Question 2: Which matcher checks if an element is in the DOM?
- A) `toBeVisible()`
- B) `toBeInTheDocument()`
- C) `toHaveValue()`
- D) `toBeChecked()`

**Answer: B** - `toBeInTheDocument()` checks if an element exists in the DOM.

### Question 3: Which matcher is best for checking array length?
- A) `toHaveLength()`
- B) `toEqual()`
- C) `toContain()`
- D) `toBe()`

**Answer: A** - `toHaveLength()` is specifically designed for checking array length.

## 🚀 Practice Exercise

**Your Turn!** Create a `ProductCard` component and test it with various matchers:

1. Create a `ProductCard` component with:
   - Product name, price, description
   - Add to cart button
   - Rating display (stars)
   - Sale badge (conditional)
   - Stock status

2. Write tests using different matchers:
   - String matching (name, description)
   - Number matching (price, rating)
   - Boolean matching (in stock, on sale)
   - Array matching (rating stars)
   - Object matching (product data)
   - Conditional rendering (sale badge)

**Bonus Challenge**: Add price formatting and test currency display patterns.

## 📝 Module Summary

In this module, you learned:
- ✅ Essential Jest matchers for different data types
- ✅ React Testing Library specific matchers
- ✅ How to combine matchers for complex assertions
- ✅ Best practices for choosing the right matcher
- ✅ Advanced matching patterns for objects and arrays

## 🎯 Next Steps

In the next module, we'll focus on testing UI elements and learn how to query elements effectively.

---

**Ready for Module 5? Let's master UI element testing! 🚀** 