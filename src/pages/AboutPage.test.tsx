import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders heading, author text and external link', () => {
    render(<AboutPage />);

    expect(screen.getByText('About This Application')).toBeInTheDocument();
    expect(screen.getByText(/Author: Ismet/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /RS School React Course/i });
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
