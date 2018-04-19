import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import './index.css';

class Menu extends Component {
  render() {
    return (
      <Navbar className="mobile-not">
        <Nav>
          <NavItem eventKey={1} href="#">
            Clothing
          </NavItem>
          <NavItem eventKey={2} href="#">
            Travel
          </NavItem>
          <NavItem eventKey={3} href="#">
            Nursery Furniture
          </NavItem>
          <NavItem eventKey={4} href="#">
            Nursery Interiors
          </NavItem>
          <NavItem eventKey={5} href="#">
            Playtime
          </NavItem>
          <NavItem eventKey={6} href="#">
            Bathtime
          </NavItem>
          <NavItem eventKey={7} href="#">
            Feeding
          </NavItem>
          <NavItem eventKey={8} href="#">
            Gifts
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;
