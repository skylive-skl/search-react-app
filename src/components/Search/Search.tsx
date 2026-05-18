import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const STORAGE_KEY = 'pokemonSearchTerm';
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTerm = localStorage.getItem(STORAGE_KEY);
    if (savedTerm) {
      setSearchTerm(savedTerm);
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    setSearchTerm(trimmedTerm);

    const savedTerm = localStorage.getItem(STORAGE_KEY) || '';
    if (trimmedTerm !== savedTerm) {
      localStorage.setItem(STORAGE_KEY, trimmedTerm);
    }

    onSearch(trimmedTerm);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border border-slate-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
        placeholder="Search for Pokemon..."
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm shadow-sm"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
