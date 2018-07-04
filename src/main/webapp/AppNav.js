import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import logo from './images/logo.png';
import 'whatwg-fetch';

const AppNav = props => {
    const { logged_in } = props;


    // conditionally renders login/logout link
    const nav = (link) => {
        return (
            <Navbar style={{backgroundColor: '#A4DB8F', backgroundImage: 'none', borderRadius: 2}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href={'/'}>
                            <img src={logo} width="32" height="32"/>
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {link}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }


    const login = <NavItem href={'/login/auth'}>Log In</NavItem>;
    const logout = <NavItem href={'/logout'}>Log Out</NavItem>;

    if (logged_in)
        return nav(logout)
    else
        return nav(login)
}


export default AppNav;
