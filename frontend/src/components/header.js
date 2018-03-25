import React, { Component } from 'react';
import CategoryMenu from './category-menu';
import SmallMenu from './small-menu';
import { Row, Col } from 'react-bootstrap';
import './header.css';
import logoPng from '../images/logo.png';
import menuPng from '../images/menu.png';
import cartPng from '../images/cart.png';

class Header extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col sm={5} xs={2} className="text-right vertical-align">
                        <img src={menuPng} alt="Menu" className="mobile-only" />
                    </Col>
                    <Col sm={2} xs={8} className="text-center">
                        <img src={logoPng} alt="Mamas Papas" className="logo-img" />
                    </Col>
                    <Col sm={5} xs={2} className="vertical-align">
                        <SmallMenu className="mobile-not" />
                        <img src={cartPng} alt="Menu" className="mobile-only" />
                    </Col>
                </Row>

                <CategoryMenu />
                <SmallMenu className="mobile-only" />
            </div>
        );
    }
}

export default Header;
