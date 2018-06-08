import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Button } from 'react-bootstrap'


import LoginModal from './LoginModal'

import logo from './images/logo.png' // WEBAPP DIR
import 'whatwg-fetch'

class AppNav extends Component {
    static propTypes = {
        showModal: PropTypes.func,
        route: PropTypes.string,
        logOut: PropTypes.func,
    }


    checkRoute()  {
        const {
            showModal,
            logOut,
        } = this.props

        const login = <Button className="pull-right" bsStyle="success" onClick={showModal}>Log In</Button>
        const logout = <Button className="pull-right" bsStyle="success" onClick={logOut}>Log Out</Button>


        switch (this.props.route) {
        case 'login':
            return login
        case 'catch':
            return logout
        default:
            return <p>Loading...</p>
        }
    }


    render() {
            const button = this.checkRoute()



            return (
              <div>
                  {/* TODO FIX LOGO */}
                  {/*
                        navbar

                        renders Log In if logged out & vice versa
                  */}
                  <Navbar inverse>
                      <Navbar.Header>
                          <Navbar.Brand>
                              <a href={'/'} onClick={this.check}>
                                  <img src={logo} alt="FishingApp" width="32" height="32"/>
                              </a>
                          </Navbar.Brand>
                          <Navbar.Toggle/>
                      </Navbar.Header>
                      <Navbar.Collapse>
                          <Navbar.Text>
                              The Fishing App
                          </Navbar.Text>
                              {button}
                      </Navbar.Collapse>
                  </Navbar>
              </div>
            )
    }
}


export default AppNav;
