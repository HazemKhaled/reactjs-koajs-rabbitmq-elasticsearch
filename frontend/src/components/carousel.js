import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

import './carousel.css';

class Slider extends Component {
  render() {
    return (

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
    );
  }
}

export default Slider;
