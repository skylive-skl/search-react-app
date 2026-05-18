import { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  const handleClick = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('This is a simulated error for testing ErrorBoundary.');
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold text-sm shadow-sm"
    >
      Throw Error
    </button>
  );
};

export default ErrorButton;
