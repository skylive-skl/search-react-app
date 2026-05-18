import { useEffect, useMemo, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Search from '../components/Search/Search';
import CardList from '../components/CardList/CardList';
import Spinner from '../components/Spinner/Spinner';
import Pagination from '../components/Pagination/Pagination';
import { fetchPokemons, type Pokemon } from '../api/pokeApi';
import useLocalStorage from '../hooks/useLocalStorage';

const PAGE_SIZE = 20;

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage<string>(
    'pokemonSearchTerm',
    ''
  );
  const [searchTerm, setSearchTerm] = useState(storedSearchTerm);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(storedSearchTerm);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { detailsId } = useParams();
  const isDetailsOpen = location.pathname.startsWith('/details/');
  const selectedPokemonId = detailsId ? Number(detailsId) : undefined;

  const pageParam = searchParams.get('page');
  const parsedPage = Number(pageParam);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const totalPages = useMemo(() => {
    const pages = Math.ceil(totalCount / PAGE_SIZE);
    return pages > 0 ? pages : 1;
  }, [totalCount]);

  useEffect(() => {
    if (!pageParam || !Number.isInteger(parsedPage) || parsedPage < 1) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      setSearchParams(params, { replace: true });
    }
  }, [pageParam, parsedPage, searchParams, setSearchParams]);

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchPokemons(
          appliedSearchTerm.trim(),
          currentPage,
          PAGE_SIZE
        );
        setPokemons(result.pokemons);
        setTotalCount(result.totalCount);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemons();
  }, [appliedSearchTerm, currentPage]);

  const updatePage = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    setSearchParams(params);
  };

  const closeDetails = () => {
    if (isDetailsOpen) {
      navigate({ pathname: '/', search: `?${searchParams.toString()}` });
    }
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    if (currentPage !== 1) {
      updatePage(1);
    }
    closeDetails();
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    setSearchTerm(trimmed);
    setAppliedSearchTerm(trimmed);
    setStoredSearchTerm(trimmed);
    if (currentPage !== 1) {
      updatePage(1);
    }
    closeDetails();
  };

  const handleSelectPokemon = (pokemonId: number) => {
    navigate({
      pathname: `/details/${pokemonId}`,
      search: `?${searchParams.toString()}`,
    });
  };

  const handleMainPanelClick = () => {
    closeDetails();
  };

  return (
    <main className="flex-1 container mx-auto p-4 flex flex-col gap-6">
      <section className="search-section bg-white p-6 rounded-lg shadow-sm border border-slate-100">
        <Search
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
          onSearch={handleSearch}
        />
      </section>

      <section className="results-section bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Results</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1" onClick={handleMainPanelClick}>
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md my-4">
                <h3 className="font-bold text-lg mb-2">Error fetching data</h3>
                <p>{error}</p>
              </div>
            ) : (
              <>
                <CardList
                  pokemons={pokemons}
                  selectedPokemonId={selectedPokemonId}
                  onSelectPokemon={handleSelectPokemon}
                />
                {pokemons.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={updatePage}
                  />
                )}
              </>
            )}
          </div>

          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
