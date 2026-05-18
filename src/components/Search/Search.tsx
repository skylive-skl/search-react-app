import { type ChangeEvent, type KeyboardEvent } from 'react';

interface Props {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
  onSearch: () => void;
}

const Search = (props: Props) => {
  const { searchTerm, onSearchTermChange, onSearch } = props;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
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
        placeholder="Search Pokemon by exact name..."
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm shadow-sm"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
