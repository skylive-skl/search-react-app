import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { Component } from 'react';

// A component that throws an error when rendered
class ProblemChild extends Component {
  render() {
    throw new Error('Test error');
    return <div>This will not render</div>;
  }
}

describe('ErrorBoundary component', () => {
  it('renders children if no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>All good here</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('All good here')).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws an error', () => {
    // Suppress console.error since we are intentionally throwing an error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Please refresh the page to try again.')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
