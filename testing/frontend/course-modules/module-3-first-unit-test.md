# Module 3: Writing First Unit Test

## 🎯 Learning Objectives
- Write your first unit test with Jest and React Testing Library
- Understand test structure with `describe`, `it`, and `expect`
- Learn testing patterns for functional components
- Practice testing components with props
- Understand test isolation and setup

## 🧪 Test Structure Fundamentals

### Basic Test Structure

```javascript
describe('Component Name', () => {
  test('should do something specific', () => {
    // Arrange - Set up your test data
    // Act - Perform the action you're testing
    // Assert - Verify the expected outcome
  });
});
```

### Test Organization Patterns

```javascript
describe('UserProfile', () => {
  // Group related tests
  describe('when user data is provided', () => {
    test('should display user name', () => {
      // test implementation
    });
    
    test('should display user email', () => {
      // test implementation
    });
  });

  describe('when user data is missing', () => {
    test('should show loading state', () => {
      // test implementation
    });
  });
});
```

## 🎯 Interactive Exercise: Testing a Button Component

Let's create a simple button component and write comprehensive tests for it!

### Step 1: Create a Button Component

Create `src/components/Button.jsx`:

```jsx
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'medium' 
}) => {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button--primary',
    secondary: 'button--secondary',
    danger: 'button--danger'
  };
  const sizeClasses = {
    small: 'button--small',
    medium: 'button--medium',
    large: 'button--large'
  };

  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'button--disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
    >
      {children}
    </button>
  );
};

export default Button;
```

### Step 2: Write Comprehensive Tests

Create `src/__tests__/Button.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Component', () => {
  // Test rendering
  test('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with correct default classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('button', 'button--primary', 'button--medium');
  });

  // Test props
  test('applies variant classes correctly', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('button--secondary');
  });

  test('applies size classes correctly', () => {
    render(<Button size="large">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('button--large');
  });

  // Test interactions
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test disabled state
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });

  test('applies disabled class when disabled', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('button--disabled');
  });

  // Test edge cases
  test('renders without children', () => {
    render(<Button />);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
  });

  test('handles undefined onClick gracefully', () => {
    render(<Button>Click me</Button>);
    expect(() => {
      fireEvent.click(screen.getByText('Click me'));
    }).not.toThrow();
  });
});
```

## 🎯 Testing Patterns Explained

### 1. Arrange-Act-Assert Pattern

```javascript
test('should increment counter when button is clicked', () => {
  // Arrange - Set up the test
  render(<Counter />);
  
  // Act - Perform the action
  fireEvent.click(screen.getByText('Increment'));
  
  // Assert - Verify the result
  expect(screen.getByText('Counter: 1')).toBeInTheDocument();
});
```

### 2. Test Data Setup

```javascript
describe('UserCard', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg'
  };

  test('displays user information', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
```

### 3. Testing Conditional Rendering

```javascript
describe('ConditionalComponent', () => {
  test('shows content when condition is true', () => {
    render(<ConditionalComponent show={true} />);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('hides content when condition is false', () => {
    render(<ConditionalComponent show={false} />);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
```

## 🎯 Common Testing Scenarios

### 1. Testing Props

```javascript
test('renders with different props', () => {
  const { rerender } = render(<Greeting name="Alice" />);
  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();

  rerender(<Greeting name="Bob" />);
  expect(screen.getByText('Hello, Bob!')).toBeInTheDocument();
});
```

### 2. Testing User Interactions

```javascript
test('updates input value when user types', () => {
  render(<SearchInput />);
  const input = screen.getByRole('textbox');
  
  fireEvent.change(input, { target: { value: 'search term' } });
  expect(input).toHaveValue('search term');
});
```

### 3. Testing Event Handlers

```javascript
test('calls onSubmit when form is submitted', () => {
  const handleSubmit = jest.fn();
  render(<SearchForm onSubmit={handleSubmit} />);
  
  fireEvent.submit(screen.getByRole('form'));
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

## 🎯 Test Isolation Best Practices

### 1. Clean Up After Each Test

```javascript
describe('Component', () => {
  afterEach(() => {
    // Clean up any side effects
    jest.clearAllMocks();
  });

  test('first test', () => {
    // test implementation
  });

  test('second test', () => {
    // test implementation
  });
});
```

### 2. Use beforeEach for Common Setup

```javascript
describe('UserProfile', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };
  });

  test('displays user name', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## 🎯 Checkpoint Quiz

### Question 1: What is the purpose of the `describe` block?
- A) To group related tests together
- B) To run tests faster
- C) To skip tests
- D) To mock functions

**Answer: A** - `describe` blocks group related tests together for better organization.

### Question 2: What is the Arrange-Act-Assert pattern?
- A) A way to write faster tests
- B) A structure for organizing test code into setup, action, and verification
- C) A method for mocking functions
- D) A way to skip tests

**Answer: B** - Arrange-Act-Assert is a pattern that structures tests into setup, action, and verification phases.

### Question 3: When should you use `beforeEach`?
- A) Never
- B) When you need to clean up after tests
- C) When multiple tests need the same setup code
- D) Only for async tests

**Answer: C** - `beforeEach` is used when multiple tests need the same setup code to avoid repetition.

## 🚀 Practice Exercise

**Your Turn!** Create a `Card` component and write comprehensive tests:

1. Create a `Card` component with:
   - Title prop
   - Content prop
   - Optional image prop
   - Click handler
   - Different variants (default, elevated, outlined)

2. Write tests for:
   - Rendering with different props
   - Conditional rendering (with/without image)
   - Click interactions
   - Different variants
   - Edge cases (empty content, long text)

**Bonus Challenge**: Add hover effects and test CSS classes that change on hover.

## 📝 Module Summary

In this module, you learned:
- ✅ How to structure tests with `describe`, `it`, and `expect`
- ✅ Testing patterns for functional components
- ✅ How to test props and user interactions
- ✅ Best practices for test organization and isolation
- ✅ Common testing scenarios and patterns

## 🎯 Next Steps

In the next module, we'll explore common Jest matchers and learn how to make more specific assertions.

---

**Ready for Module 4? Let's master Jest matchers! 🚀** 