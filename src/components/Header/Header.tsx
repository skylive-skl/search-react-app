import ErrorButton from '../ErrorButton/ErrorButton';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pokemon Search API</h1>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-3 text-sm">
            <NavLink
              to="/?page=1"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold' : 'hover:underline'
              }
            >
              About
            </NavLink>
          </nav>
          <ErrorButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
