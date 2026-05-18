import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Search from './Search';

describe('Search component', () => {
  const mockOnSearch = vi.fn();
  const ControlledSearch = ({ initialTerm = '' }: { initialTerm?: string }) => {
    const [searchTerm, setSearchTerm] = useState(initialTerm);

    return (
      <Search
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={mockOnSearch}
      />
    );
  };

  const setup = (searchTerm = '') =>
    render(
      <ControlledSearch initialTerm={searchTerm} />
    );

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
  });

  it('renders correctly', () => {
    setup();
    expect(
      screen.getByPlaceholderText(/search pokemon by exact name/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('renders provided search term value', () => {
    setup('pikachu');
    expect(
      screen.getByPlaceholderText(/search pokemon by exact name/i)
    ).toHaveValue('pikachu');
  });

  it('updates input value on change', async () => {
    const user = userEvent.setup();
    setup();

    const input = screen.getByPlaceholderText(/search pokemon by exact name/i);
    await user.type(input, 'charizard');

    expect(input).toHaveValue('charizard');
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
