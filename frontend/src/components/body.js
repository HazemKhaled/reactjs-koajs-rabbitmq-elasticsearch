import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import searchIcon from '../images/search.png';
import './body.css';

class Body extends Component {
    render() {
        return (
            <div>

                <div className="search-container">
                    <input placeholder="Hello, I'm looking for..." />
                    <img src={searchIcon} alt="search" />
                </div>

                <Carousel>
                    <Carousel.Item>
                        <img src="http://lorempixel.com/960/375/fashion/?someRandomStrings" alt="img1" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="http://lorempixel.com/960/375/fashion/?someRandomStrings" alt="img1" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="http://lorempixel.com/960/375/fashion/?someRandomStrings" alt="img1" />
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Body;
