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