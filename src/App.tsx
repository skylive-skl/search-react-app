import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="details/:detailsId" element={<PokemonDetails />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/home" element={<Navigate to="/?page=1" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
