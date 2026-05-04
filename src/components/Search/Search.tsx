import { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Search Pokemon..." 
          className="flex-1 border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
        <button className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors">
          Search
        </button>
      </div>
    );
  }
}

export default Search;
