import { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow h-48">
        <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 animate-pulse"></div>
        <div className="h-4 bg-slate-200 w-2/3 rounded animate-pulse"></div>
      </div>
    );
  }
}

export default Card;
