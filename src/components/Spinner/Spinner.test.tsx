import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('renders correctly', () => {
    const { container } = render(<Spinner />);
    // Testing if the spinner div exists using a generic query or class check
    // since there's no text or role we can easily query for unless we modify the component.
    // The requirement says "no functional changes", adding data-testid or aria-label is fine,
    // but we can also just check container content.
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });
});
