import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders the title correctly', () => {
    render(<Header />);
    expect(screen.getByText('Pokemon Search API')).toBeInTheDocument();
  });

  it('renders the ErrorButton', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /throw error/i })).toBeInTheDocument();
  });
});
