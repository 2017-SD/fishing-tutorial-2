import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { nav_styles } from './util/Styles'

import 'whatwg-fetch';

const AppNav = props => {
    const {
        logged_in,
        online
    } = props;


    // conditionally renders login/logout link
    const nav = (link) => {
        return (
            <Navbar style={nav_styles.nav}>
                <Nav style={nav_styles.item} pullLeft>
                    <NavItem href={'/'}>
                        The Fishing App
                    </NavItem>
                </Nav>

                <Nav style={nav_styles.item_right} pullRight>
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
