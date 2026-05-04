export interface Pokemon {
  id: number;
  name: string;
  image: string;
  description: string;
}

export const fetchPokemons = async (searchTerm: string = ''): Promise<Pokemon[]> => {
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
      return [{
        id: data.id,
        name: data.name,
        image: data.sprites.front_default || '',
        description: `Height: ${data.height}, Weight: ${data.weight}`
      }];
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching data.');
    }
  } else {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
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
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default || '',
          description: `Height: ${details.height}, Weight: ${details.weight}`
        };
      });
      
      return Promise.all(detailedPromises);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching data.');
    }
  }
};
