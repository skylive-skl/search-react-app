import { fetchPokemonDetails, fetchPokemons } from './pokeApi';

describe('pokeApi helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchPokemonDetails maps successful response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        id: 7,
        name: 'squirtle',
        sprites: { front_default: null },
        height: 5,
        weight: 90,
      }),
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchPokemonDetails('Squirtle')).resolves.toEqual({
      id: 7,
      name: 'squirtle',
      image: '',
      description: 'Height: 5, Weight: 90',
    });
  });

  it('fetchPokemonDetails throws specific errors by status code', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ ok: false, status: 404 })
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: false, status: 418 })
    );

    await expect(fetchPokemonDetails('missing')).rejects.toThrow(
      'Pokemon "missing" not found.'
    );
    await expect(fetchPokemonDetails('broken')).rejects.toThrow(
      'Server error. Please try again later.'
    );
    await expect(fetchPokemonDetails('teapot')).rejects.toThrow(
      'API error: 418'
    );
  });

  it('fetchPokemons by search term returns one mapped pokemon', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          id: 25,
          name: 'pikachu',
          sprites: { front_default: 'pikachu.png' },
          height: 4,
          weight: 60,
        }),
      })
    );

    await expect(fetchPokemons('Pikachu')).resolves.toEqual({
      pokemons: [
        {
          id: 25,
          name: 'pikachu',
          image: 'pikachu.png',
          description: 'Height: 4, Weight: 60',
        },
      ],
      totalCount: 1,
    });
  });

  it('fetchPokemons search throws specific errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ ok: false, status: 404 })
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: false, status: 400 })
    );

    await expect(fetchPokemons('missing')).rejects.toThrow(
      'Pokemon "missing" not found. Please check your spelling.'
    );
    await expect(fetchPokemons('oops')).rejects.toThrow(
      'Server error. Please try again later.'
    );
    await expect(fetchPokemons('bad')).rejects.toThrow('API error: 400');
  });

  it('fetchPokemons list mode returns mapped list and count fallback', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue({
            count: 0,
            results: [
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/',
              },
              { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue({
            id: 1,
            name: 'bulbasaur',
            sprites: { front_default: 'bulbasaur.png' },
            height: 7,
            weight: 69,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue({
            id: 2,
            name: 'ivysaur',
            sprites: { front_default: 'ivysaur.png' },
            height: 10,
            weight: 130,
          }),
        })
    );

    const result = await fetchPokemons('', 0, 20);

    expect(result.totalCount).toBe(2);
    expect(result.pokemons).toHaveLength(2);
    expect(result.pokemons[0].name).toBe('bulbasaur');
  });

  it('fetchPokemons list mode throws on list and details failures', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue({
            count: 1,
            results: [
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/',
              },
            ],
          }),
        })
        .mockResolvedValueOnce({ ok: false })
    );

    await expect(fetchPokemons('', 1, 20)).rejects.toThrow(
      'Server error. Please try again later.'
    );
    await expect(fetchPokemons('', 1, 20)).rejects.toThrow(
      'Failed to fetch details for bulbasaur'
    );
  });
});
