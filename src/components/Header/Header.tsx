import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Pokemon Search</h1>
        </div>
      </header>
    );
  }
}

export default Header;
