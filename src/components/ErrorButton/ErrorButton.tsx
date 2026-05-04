import { Component } from 'react';

interface State {
  shouldThrow: boolean;
}

class ErrorButton extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { shouldThrow: false };
  }

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('This is a simulated error for testing ErrorBoundary.');
    }

    return (
      <button
        onClick={this.handleClick}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold text-sm shadow-sm"
      >
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
