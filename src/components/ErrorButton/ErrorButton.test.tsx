import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton component', () => {
  it('renders correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByRole('button', { name: /throw error/i })).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    // We need to suppress console.error for this test because React logs the error boundary error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<ErrorButton />);
    
    const button = screen.getByRole('button', { name: /throw error/i });
    
    expect(() => fireEvent.click(button)).toThrow('This is a simulated error for testing ErrorBoundary.');
    
    consoleSpy.mockRestore();
  });
});
