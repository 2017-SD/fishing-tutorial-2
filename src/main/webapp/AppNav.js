import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Button } from 'react-bootstrap'


//import LoginModal from './LoginModal'

import logo from './images/logo.png' // WEBAPP DIR
import 'whatwg-fetch'

class AppNav extends Component {
    static propTypes = {
        showModal: PropTypes.func,
        logged_in: PropTypes.bool,
        logOut: PropTypes.func
    }


    checkRoute()  {
        const {
            showModal,
            logged_in,
            logOut,
        } = this.props

        const login = <Button className="pull-right" bsStyle="success" onClick={showModal}>Log In</Button>
        const logout = <Button className="pull-right" bsStyle="success" onClick={logOut}>Log Out</Button>


        // switch (route) {
        // case 'login':
        //     return login
        // case 'catch':
        //     return logout
        // default:
        //     return <p>Loading...</p>
        // }
        //alert(`logged_in boolean: ${logged_in}`)

        if (logged_in)
            return logout
        else
            return login
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
