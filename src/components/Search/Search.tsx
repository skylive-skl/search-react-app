import { Component, type ChangeEvent, type KeyboardEvent } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  private readonly STORAGE_KEY = 'pokemonSearchTerm';

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem(this.STORAGE_KEY);
    if (savedTerm) {
      this.setState({ searchTerm: savedTerm });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    
    this.setState({ searchTerm: trimmedTerm });
    
    const savedTerm = localStorage.getItem(this.STORAGE_KEY) || '';
    if (trimmedTerm !== savedTerm) {
      localStorage.setItem(this.STORAGE_KEY, trimmedTerm);
    }

    this.props.onSearch(trimmedTerm);
  };

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="flex gap-2">
        <input 
          type="text" 
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search Pokemon by exact name..." 
          className="flex-1 border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
        <button 
          onClick={this.handleSearch}
          className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
