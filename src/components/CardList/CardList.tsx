import { Component } from 'react';
import Card from '../Card/Card';
import type { Pokemon } from '../../api/pokeApi';

interface Props {
  pokemons: Pokemon[];
}

class CardList extends Component<Props> {
  render() {
    const { pokemons } = this.props;

    if (pokemons.length === 0) {
      return (
        <div className="text-center text-slate-500 py-12">
          <p className="text-lg">No Pokemon found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default CardList;
