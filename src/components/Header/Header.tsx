import ErrorButton from '../ErrorButton/ErrorButton';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pokemon Search API</h1>
        <ErrorButton />
      </div>
    </header>
  );
};

export default Header;
