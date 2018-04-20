import React, { Component } from 'react';
import { Glyphicon, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

import './index.css';
import searchIcon from '../../images/search.png';

class Search extends Component {
  state = {
    gotError: false,
    products: [],
    searchResultClass: 'hide',
    loading: true
  };

  handleSearchChange = event => {
    // Search query
    const value = event.target.value.trim();

    // Show/Hide search result depend on search length
    const searchState = value.length > 2;

    this.setState({
      searchResultClass: searchState ? '' : 'hide'
    });

    // No need to search if less than 3
    if (!searchState) {
      return;
    }

    // Show loading
    this.setState({ loading: true });

    // Ping the service
    fetch('/search?keyword=' + encodeURIComponent(value))
      .then(response => response.json())
      .then(products => {
        this.setState({
          products,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          gotError: true,
          loading: false
        });
      });
  };

  render() {
    let productRows = '';

    if (this.state.loading) {
      productRows = <Glyphicon glyph="refresh" />;
    } else if (this.state.gotError) {
      productRows = (
        <Alert bsStyle="danger">
          <strong>Ops!</strong> We got error :-(
        </Alert>
      );
    } else if (this.state.products.length !== 0) {
      productRows = this.state.products.map(product => (
        <ListGroupItem key={product._id}>{product._source.name}</ListGroupItem>
      ));
    } else {
      productRows = (
        <Alert bsStyle="warning">
          <strong>Ops!</strong> we have no products :-(
        </Alert>
      );
    }

    return (
      <div className="search-container">
        <input
          placeholder="Hello, I'm looking for..."
          ref={input => (this.search = input)}
          onChange={this.handleSearchChange}
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
