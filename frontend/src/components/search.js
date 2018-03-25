import React, { Component } from 'react';
import searchIcon from '../images/search.png';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import './search.css';

class Search extends Component {
    state = { products: [], searchResultClass: 'hide' };

    handleSearchChange = (event) => {
        const value = event.target.value.trim();

        this.setState({
            products: [],
            searchResultClass: value.length > 2 ? '' : 'hide'
        });

        if (value.length <= 2) {
            return;
        }

        console.log('Search for', value);
        //TODO: Fetch from API
        fetch('/search?keyword=' + encodeURIComponent(value))
            .then((response) => {
                return response.json();
            })
            .then((products) => {
                console.log(products);
                this.setState({
                    products,
                    searchResultClass: value.length > 2 ? '' : 'hide'
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { products } = this.state;

        let productRows = products.map((product) => (
            <ListGroupItem key={product.sku}>{product.name}</ListGroupItem>
        ));

        productRows = productRows || <Glyphicon glyph="refresh" />;

        return (
            <div className="search-container">
                <input placeholder="Hello, I'm looking for..." onKeyUp={this.handleSearchChange} />
                <img src={searchIcon} alt="search" />
                <div className={`search-result ${this.state.searchResultClass}`}>
                    <ListGroup>
                        {productRows}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default Search;
