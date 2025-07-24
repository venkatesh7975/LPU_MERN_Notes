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