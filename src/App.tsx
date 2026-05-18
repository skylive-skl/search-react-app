import { Component } from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Spinner from './components/Spinner/Spinner';
import { fetchPokemons, type Pokemon } from './api/pokeApi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

interface State {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  lastSearchedTerm: string | null;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: [],
      isLoading: false,
      error: null,
      lastSearchedTerm: null,
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('pokemonSearchTerm') || '';
    this.handleSearch(savedTerm);
  }

  handleSearch = async (searchTerm: string) => {
    if (this.state.lastSearchedTerm === searchTerm && !this.state.error) {
      return;
    }

    this.setState({ isLoading: true, error: null, lastSearchedTerm: searchTerm });
    try {
      const pokemons = await fetchPokemons(searchTerm);
      this.setState({ pokemons, isLoading: false });
    } catch (err) {
      if (err instanceof Error) {
        this.setState({ error: err.message, isLoading: false });
      } else {
        this.setState({ error: 'An unknown error occurred.', isLoading: false });
      }
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
              </div>
              
              {this.state.isLoading ? (
                <Spinner />
              ) : this.state.error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md my-4">
                  <h3 className="font-bold text-lg mb-2">Error fetching data</h3>
                  <p>{this.state.error}</p>
                </div>
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
