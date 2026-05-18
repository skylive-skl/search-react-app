import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';

const renderWithRouter = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/pokemon/:detailsId" element={<PokemonDetails />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('PokemonDetails component', () => {
  it('renders pokemon details for a valid id and closes back preserving query', async () => {
    const user = userEvent.setup();
    renderWithRouter('/pokemon/pikachu?page=3');

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
    expect(screen.getByText('Height: 4, Weight: 60')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('shows an error for unknown pokemon', async () => {
    renderWithRouter('/pokemon/unknownpokemon?page=1');

    await waitFor(() => {
      expect(screen.getByText('Pokemon "unknownpokemon" not found.')).toBeInTheDocument();
    });
  });
});
