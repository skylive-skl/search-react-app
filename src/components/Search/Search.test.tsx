import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search component', () => {
  const mockOnSearch = vi.fn();
  const mockOnSearchTermChange = vi.fn();
  const setup = (searchTerm = '') =>
    render(
      <Search
        searchTerm={searchTerm}
        onSearchTermChange={mockOnSearchTermChange}
        onSearch={mockOnSearch}
      />
    );

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
    mockOnSearchTermChange.mockClear();
  });

  it('renders correctly', () => {
    setup();
    expect(screen.getByPlaceholderText(/search pokemon by exact name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('renders provided search term value', () => {
    setup('pikachu');
    expect(screen.getByPlaceholderText(/search pokemon by exact name/i)).toHaveValue('pikachu');
  });

  it('updates input value on change', async () => {
    const user = userEvent.setup();
    setup();
    
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.type(input, 'charizard');
    
    expect(mockOnSearchTermChange).toHaveBeenLastCalledWith('charizard');
  });

  it('calls onSearch on search button click', async () => {
    const user = userEvent.setup();
    setup();
    
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch on Enter key press', async () => {
    const user = userEvent.setup();
    setup();
    
    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.type(input, 'mewtwo{enter}');
    
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
