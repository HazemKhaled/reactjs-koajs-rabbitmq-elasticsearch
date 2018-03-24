import React, { Component } from 'react';
import Navbar from './navbar';
import { PageHeader } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <PageHeader>
                <img id="logo-main" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32877/logo-thing.png" width="200" alt="Logo Thing main logo" />
                <Navbar  />
            </PageHeader>
        );
    }
}

export default Header;
