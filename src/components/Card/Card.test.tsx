import { render, screen } from '@testing-library/react';
import Card from './Card';
import type { Pokemon } from '../../api/pokeApi';

describe('Card component', () => {
  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    description: 'Height: 7, Weight: 69'
  };

  it('renders pokemon details correctly', () => {
    render(<Card pokemon={mockPokemon} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Height: 7, Weight: 69')).toBeInTheDocument();
    
    const image = screen.getByRole('img', { name: 'bulbasaur' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPokemon.image);
  });

  it('renders "No Image" when image is empty', () => {
    const pokemonWithoutImage = { ...mockPokemon, image: '' };
    render(<Card pokemon={pokemonWithoutImage} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('No Image')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
