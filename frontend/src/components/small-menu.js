import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import './small-menu.css';

class Menu extends Component {
  render() {
    return (
      <Navbar fluid className={`small-menu ${this.props.className}`}>
        <Nav>
          <NavItem eventKey={1} href="#">
            Sign in / Register
          </NavItem>
          <NavItem>|</NavItem>
          <NavItem eventKey={2} href="#">
            Stores
          </NavItem>
          <NavItem className="mobile-not">|</NavItem>
          <NavItem className="mobile-not" eventKey={3} href="#">
            Your bag (2)
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
