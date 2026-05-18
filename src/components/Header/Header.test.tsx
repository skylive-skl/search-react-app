import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  it('renders the title correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('Pokemon Search API')).toBeInTheDocument();
  });

  it('renders the ErrorButton', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /throw error/i })).toBeInTheDocument();
  });
});
