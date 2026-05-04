import { Component } from 'react';

class Spinner extends Component {
  render() {
    return (
      <div className="flex justify-center items-center py-16 w-full">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-slate-800"></div>
      </div>
    );
  }
}

export default Spinner;
