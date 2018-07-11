import React from 'react';
import { Navbar, Nav, NavItem, Image, ListGroup } from 'react-bootstrap';

import logo from './images/logo.png';
import 'whatwg-fetch';

const AppNav = props => {
    const {
        logged_in,
        online
    } = props;


    // conditionally renders login/logout link
    const nav = (link) => {
        return (
            <Navbar id={'nav'}>
                <Nav pullLeft>
                    <NavItem href={'/'}>
                        <Image src={logo} responsive/>
                    </NavItem>
                </Nav>

                <Nav pullRight>
                    { /* only show login/logout button if online */
                        online &&
                        link
                    }
                </Nav>
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
