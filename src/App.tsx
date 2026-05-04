import { Component } from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { fetchPokemons, type Pokemon } from './api/pokeApi';

interface State {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('pokemonSearchTerm') || '';
    this.handleSearch(savedTerm);
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    try {
      const pokemons = await fetchPokemons(searchTerm);
      this.setState({ pokemons, loading: false });
    } catch (err) {
      this.setState({ error: 'Failed to fetch data', loading: false });
    }
  };

  render() {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <ErrorBoundary>
          <Header />
          <main className="flex-1 container mx-auto p-4 flex flex-col gap-6">
            <section className="search-section bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <Search onSearch={this.handleSearch} />
            </section>
            <section className="results-section bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Results</h2>
                {this.state.loading && <span className="text-slate-500 animate-pulse">Loading...</span>}
              </div>
              
              {this.state.error ? (
                <div className="text-red-500">{this.state.error}</div>
              ) : (
                <CardList pokemons={this.state.pokemons} />
              )}
            </section>
          </main>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
