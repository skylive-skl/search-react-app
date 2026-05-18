const AboutPage: React.FC = () => {
  return (
    <main className="flex-1 container mx-auto p-4">
      <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">
          About This Application
        </h2>
        <p className="text-slate-700">
          Author: Ismet. This project is a Pokemon search application built with
          React and TypeScript.
        </p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="inline-block text-blue-700 hover:text-blue-900 underline"
        >
          RS School React Course
        </a>
      </section>
    </main>
  );
};

export default AboutPage;
