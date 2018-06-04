import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavDropdown, Nav, MenuItem } from 'react-bootstrap'

import logo from './images/logo.png' // WEBAPP DIR
import 'whatwg-fetch'

class AppNav extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool,
        logIn: PropTypes.func,
        logOut: PropTypes.func,
  }

  render() {
      const {
          loggedIn,
          logIn,
          logOut,
      } = this.props

      return (
          <Navbar style={{backgroundColor: '#000', backgroundImage: 'none', borderRadius: 0}}>
              <Navbar.Header>
                  <Navbar.Brand>
                      <a href={'/'}>
                          <span>
                              <img src={logo} alt="FishingApp" width="24" height="24"/>
                              Fishing App
                          </span>
                      </a>
                  </Navbar.Brand>
                  <Navbar.Toggle/>
              </Navbar.Header>
              <Navbar.Collapse>
                  <Nav pullRight>
                      {
                          loggedIn ?
                              (<a href={'/'} onClick={logOut}>Log Out</a>) // true
                              :
                              (<a href={'/'} onClick={logIn}>Log In</a>) // false
                      }
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      )
  }

}

export default AppNav;
