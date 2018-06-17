import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Button, Nav } from 'react-bootstrap'


import logo from './images/logo.png' // WEBAPP DIR
import 'whatwg-fetch';


class AppNav extends Component {
    static propTypes = {
        showModal: PropTypes.func,
        logged_in: PropTypes.bool,
        logOut: PropTypes.func
    }

    getButton() {
        const {
            showModal,
            logged_in,
            logOut,
        } = this.props

        const login = <Button className="pull-right" bsStyle="success" onClick={showModal}>Log In</Button>
        const logout = <Button className="pull-right" bsStyle="success" onClick={logOut}>Log Out</Button>

        if (logged_in)
            return logout
        else
            return login
    }

    render() {

        const button = this.getButton()


        return(
            <div>
                <Navbar style={{backgroundColor: '#424649', backgroundImage: 'none', borderRadius: 0}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href={'/'}>
                                <img src={logo} alt="Grails" width="30" height="30"/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
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
