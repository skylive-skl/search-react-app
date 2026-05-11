import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.has('limit')) {
      return HttpResponse.json({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]
      });
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const { name } = params;
    
    if (name === '1' || name === 'bulbasaur') {
      return HttpResponse.json({
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'bulbasaur.png' },
        height: 7,
        weight: 69
      });
    }
    
    if (name === '2' || name === 'ivysaur') {
      return HttpResponse.json({
        id: 2,
        name: 'ivysaur',
        sprites: { front_default: 'ivysaur.png' },
        height: 10,
        weight: 130
      });
    }

    if (name === 'pikachu') {
      return HttpResponse.json({
        id: 25,
        name: 'pikachu',
        sprites: { front_default: 'pikachu.png' },
        height: 4,
        weight: 60
      });
    }

    if (name === 'error-500') {
      return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
    }

    return new HttpResponse('Not Found', { status: 404 });
  })
];
