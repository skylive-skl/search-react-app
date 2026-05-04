import { Component } from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <ErrorBoundary>
          <Header />
          <main className="flex-1 container mx-auto p-4 flex flex-col gap-6">
            <section className="search-section bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <Search />
            </section>
            <section className="results-section bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex-1">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Results</h2>
              <CardList />
            </section>
          </main>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
