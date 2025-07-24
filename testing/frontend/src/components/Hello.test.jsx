// src/components/Hello.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ Important for `toBeInTheDocument`
import Hello from './Hello';

describe('Hello component', () => {
  it('renders the name passed as prop', () => {
    render(<Hello name="Venkatesh" />);
    expect(screen.getByText('Hello, Venkatesh!')).toBeInTheDocument();
  });
});
