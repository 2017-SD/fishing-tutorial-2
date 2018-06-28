import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types'


import logo from './images/logo.png';
import 'whatwg-fetch';

class AppNav extends Component {
    static propTypes = {
        logged_in: PropTypes.bool
    }


    // conditionally renders login/logout link
    accountAction() {
        const logged_in = this.props
        const value = Object.values(logged_in)

        const login = <NavItem href={'/login/auth'}>Log In</NavItem>;
        const logout = <NavItem href={'/logout'}>Log Out</NavItem>;


        if (value == 'true')
            return logout
        else
            return login
    }


    render() {

        const link = this.accountAction()

        return(
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
        );
    }

}

export default AppNav;
