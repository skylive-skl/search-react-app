import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('fetches default list on initial mount', async () => {
    render(<App />);
    
    // Should show loading spinner initially
    expect(screen.getByRole('status', { hidden: true }) || document.querySelector('.animate-spin')).toBeInTheDocument();
    
    // Wait for the mock API call to resolve and display the results
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('fetches specific pokemon when search term exists in localStorage', async () => {
    localStorage.setItem('pokemonSearchTerm', 'pikachu');
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('searches for a new pokemon on form submission', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    
    // Type in search box
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.clear(input);
    await user.type(input, 'pikachu');
    
    // Click search button
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    
    // Wait for new results
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('displays an error message when API call fails (404)', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.clear(input);
    await user.type(input, 'unknownpokemon');
    
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
      expect(screen.getByText(/Pokemon "unknownpokemon" not found/i)).toBeInTheDocument();
    });
  });

  it('displays an error message when API call fails (500)', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.clear(input);
    await user.type(input, 'error-500');
    
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
      expect(screen.getByText(/Server error/i)).toBeInTheDocument();
    });
  });
});
