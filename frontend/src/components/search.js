import React, { Component } from 'react';
import searchIcon from '../images/search.png';
import { Glyphicon } from 'react-bootstrap';
import './search.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { searchResultClass: 'hide' };
    }

    search(event) {
        const value = event.target.value.trim();

        this.setState({ comment: 'Hello' });

        this.setState({
            searchResultClass: value.length > 2 ? '' : 'hide'
        });

        console.log('Search for', value);
        //TODO: Fetch from API
    }

    render() {
        return (
            <div className="search-container">
                <input placeholder="Hello, I'm looking for..." onKeyUp={this.search.bind(this)} />
                <img src={searchIcon} alt="search" />
                <div className={`search-result ${this.state.searchResultClass}`}>
                    <Glyphicon glyph="refresh" />
                </div>
            </div>
        );
    }
}

export default Search;
