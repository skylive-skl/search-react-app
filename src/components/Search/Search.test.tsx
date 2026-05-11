import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
  });

  it('renders correctly', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/search pokemon by exact name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('reads from localStorage on mount', () => {
    localStorage.setItem('pokemonSearchTerm', 'pikachu');
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/search pokemon by exact name/i)).toHaveValue('pikachu');
  });

  it('updates input value on change', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.type(input, 'charizard');
    
    expect(input).toHaveValue('charizard');
  });

  it('calls onSearch and saves to localStorage on search button click', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.type(input, ' charizard '); // with spaces to test trim
    
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('charizard');
    expect(localStorage.getItem('pokemonSearchTerm')).toBe('charizard');
  });

  it('calls onSearch and saves to localStorage on Enter key press', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.type(input, 'mewtwo{enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('mewtwo');
    expect(localStorage.getItem('pokemonSearchTerm')).toBe('mewtwo');
  });
});
