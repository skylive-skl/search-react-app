import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { fetchPokemonDetails, type Pokemon } from '../../api/pokeApi';

const PokemonDetails: React.FC = () => {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) {
      return;
    }

    const loadDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const details = await fetchPokemonDetails(detailsId);
        setPokemon(details);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load details.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadDetails();
  }, [detailsId]);

  const handleClose = () => {
    navigate({ pathname: '/', search: `?${searchParams.toString()}` });
  };

  return (
    <aside className="w-full lg:w-90 xl:w-105 bg-white border border-slate-100 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Pokemon Details</h3>
        <button
          type="button"
          onClick={handleClose}
          className="text-slate-600 hover:text-slate-900 border border-slate-300 rounded px-2 py-1 text-sm"
        >
          Close
        </button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">{error}</div>
      ) : pokemon ? (
        <div className="space-y-4">
          <div className="w-36 h-36 mx-auto bg-slate-50 rounded-full flex items-center justify-center overflow-hidden">
            {pokemon.image ? (
              <img src={pokemon.image} alt={pokemon.name} className="w-full h-full object-contain" />
            ) : (
              <span className="text-slate-400 text-sm">No Image</span>
            )}
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold capitalize text-slate-800">{pokemon.name}</h4>
            <p className="text-slate-600 mt-2">{pokemon.description}</p>
          </div>
        </div>
      ) : null}
    </aside>
  );
};

export default PokemonDetails;
