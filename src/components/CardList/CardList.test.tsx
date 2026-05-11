import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import type { Pokemon } from '../../api/pokeApi';

describe('CardList component', () => {
  const mockPokemons: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      image: 'bulbasaur.png',
      description: 'desc 1'
    },
    {
      id: 2,
      name: 'ivysaur',
      image: 'ivysaur.png',
      description: 'desc 2'
    }
  ];

  it('renders "No Pokemon found" when array is empty', () => {
    render(<CardList pokemons={[]} />);
    expect(screen.getByText('No Pokemon found.')).toBeInTheDocument();
  });

  it('renders correct number of Card components', () => {
    render(<CardList pokemons={mockPokemons} />);
    // Looking for the headings of the cards
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
