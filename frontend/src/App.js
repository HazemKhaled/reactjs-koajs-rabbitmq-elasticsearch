import React, { Component } from 'react';

import Header from './components/header';
import Carousel from './components/carousel';
import Search from './components/search';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Search />
        <Carousel />
      </div>
    );
  }
}

export default App;
