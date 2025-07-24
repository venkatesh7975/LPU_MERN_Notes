import { render, screen } from '@testing-library/react';
import Greeting from '../components/Greeting';

describe('Greeting Component', () => {
  test('renders default greeting', () => {
    render(<Greeting />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('renders custom greeting', () => {
    render(<Greeting name="Alice" />);
    expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
  });
}); 