import React, { Component } from 'react';
import searchIcon from '../images/search.png';
import './search.css';

class Search extends Component {
    render() {
        return (
            <div className="search-container">
                <input placeholder="Hello, I'm looking for..." />
                <img src={searchIcon} alt="search" />
            </div>
        );
    }
}

export default Search;
