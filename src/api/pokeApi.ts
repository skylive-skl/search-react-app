export interface Pokemon {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface PokemonSearchResult {
  pokemons: Pokemon[];
  totalCount: number;
}

const mapPokemonFromApi = (data: { id: number; name: string; sprites: { front_default: string | null }; height: number; weight: number }): Pokemon => ({
  id: data.id,
  name: data.name,
  image: data.sprites.front_default || '',
  description: `Height: ${data.height}, Weight: ${data.weight}`,
});

export const fetchPokemonDetails = async (idOrName: string): Promise<Pokemon> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon "${idOrName}" not found.`);
      }
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return mapPokemonFromApi(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching details.');
  }
};

export const fetchPokemons = async (
  searchTerm: string = '',
  page: number = 1,
  limit: number = 20
): Promise<PokemonSearchResult> => {
  if (searchTerm) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Pokemon "${searchTerm}" not found. Please check your spelling.`);
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return {
        pokemons: [mapPokemonFromApi(data)],
        totalCount: 1,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching data.');
    }
  } else {
    try {
      const safePage = Math.max(1, page);
      const offset = (safePage - 1) * limit;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      
      const detailedPromises = data.results.map(async (item: { name: string, url: string }) => {
        const res = await fetch(item.url);
        if (!res.ok) throw new Error(`Failed to fetch details for ${item.name}`);
        const details = await res.json();
        return mapPokemonFromApi(details);
      });

      const pokemons = await Promise.all(detailedPromises);
      return {
        pokemons,
        totalCount: Number(data.count) || pokemons.length,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching data.');
    }
  }
};
