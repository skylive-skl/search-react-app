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
        if (response.status === 404) return [];
        throw new Error('Network error');
      }
      const data = await response.json();
      return [{
        id: data.id,
        name: data.name,
        image: data.sprites.front_default || '',
        description: `Height: ${data.height}, Weight: ${data.weight}`
      }];
    } catch (error) {
      console.error(error);
      return [];
    }
  } else {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    
    const detailedPromises = data.results.map(async (item: { name: string, url: string }) => {
      const res = await fetch(item.url);
      const details = await res.json();
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.front_default || '',
        description: `Height: ${details.height}, Weight: ${details.weight}`
      };
    });
    
    return Promise.all(detailedPromises);
  }
};
