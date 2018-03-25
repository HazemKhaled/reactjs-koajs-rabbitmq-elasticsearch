import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Carousel from './components/carousel';
import Search from './components/search';

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
