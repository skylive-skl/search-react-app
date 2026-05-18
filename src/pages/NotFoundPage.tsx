import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <main className="flex-1 container mx-auto p-4">
      <section className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800">404</h2>
        <p className="text-slate-700">Page not found. The route you requested does not exist.</p>
        <Link
          to="/?page=1"
          className="inline-block bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
