import { Component } from 'react';
import type { Pokemon } from '../../api/pokeApi';

interface Props {
  pokemon: Pokemon;
}

class Card extends Component<Props> {
  render() {
    const { pokemon } = this.props;
    
    return (
      <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200 group">
        <div className="w-24 h-24 mb-4 bg-slate-50 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
          {pokemon.image ? (
            <img 
              src={pokemon.image} 
              alt={pokemon.name} 
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-slate-300 text-xs">No Image</span>
          )}
        </div>
        <h3 className="font-bold text-lg capitalize text-slate-800 mb-1 text-center truncate w-full">
          {pokemon.name}
        </h3>
        <p className="text-sm text-slate-500 text-center">
          {pokemon.description}
        </p>
      </div>
    );
  }
}

export default Card;
