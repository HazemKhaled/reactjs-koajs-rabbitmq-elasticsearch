import React, { Component } from 'react';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

import './search.css';
import searchIcon from '../images/search.png';

class Search extends Component {
  state = { products: [], searchResultClass: 'hide' };

  handleSearchChange = event => {
    const value = event.target.value.trim();

    this.setState({
      products: [],
      searchResultClass: value.length > 2 ? '' : 'hide'
    });

    if (value.length <= 2) {
      return;
    }

    //TODO: Fetch from API
    fetch('/search?keyword=' + encodeURIComponent(value))
      .then(response => response.json())
      .then(products => {
        this.setState({
          products,
          searchResultClass: value.length > 2 ? '' : 'hide'
        });
      })
      .catch(error => {
        //TODO: Handle error here
      });
  };

  render() {
    let productRows = this.state.products.map(product => (
      <ListGroupItem key={product._id}>{product._source.name}</ListGroupItem>
    ));

    productRows =
      this.state.products.length !== 0 ? (
        productRows
      ) : (
        <Glyphicon glyph="refresh" />
      );

    return (
      <div className="search-container">
        <input
          placeholder="Hello, I'm looking for..."
          onKeyUp={this.handleSearchChange}
        />
        <img src={searchIcon} alt="search" />
        <div className={`search-result ${this.state.searchResultClass}`}>
          <ListGroup>{productRows}</ListGroup>
        </div>
      </div>
    );
  }
}

export default Search;
