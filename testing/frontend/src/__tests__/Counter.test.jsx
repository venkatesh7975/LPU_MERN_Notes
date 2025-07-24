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

  test('can increment multiple times', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Increment'));
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByText('Counter: 3')).toBeInTheDocument();
  });

  test('can decrement below zero', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Decrement'));
    expect(screen.getByText('Counter: -1')).toBeInTheDocument();
  });
}); 