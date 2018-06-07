import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavItem, Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import LoginModal from './LoginModal'

import logo from './images/logo.png' // WEBAPP DIR
import 'whatwg-fetch'

class AppNav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showing_modal: false,
            usrname: "",
            passwd: "",
        }
    }

    static propTypes = {
        logged_in: PropTypes.bool,
        logIn: PropTypes.func,
        logOut: PropTypes.func,
    }

    // updates the property being changed
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // stops the form from doing default form things
    // passes the username & password up to the login function
    handleSubmit = (e) => {
        e.preventDefault()

        this.props.logIn(this.state.usrname, this.state.passwd)
    }

    // opens and closes modal
    toggleModal = () => {
        var showing = !this.state.showing_modal

        this.setState({showing_modal: showing})
    }

    render() {
          const {
              logged_in,
              logIn,
              logOut,
          } = this.props

          const {
              showing_modal,
              usrname,
              passwd,
          } = this.state

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
                              <a href={'/'}>
                                  <img src={logo} alt="FishingApp" width="32" height="32"/>
                              </a>
                          </Navbar.Brand>
                          <Navbar.Toggle/>
                      </Navbar.Header>
                      <Navbar.Collapse>
                          <Navbar.Text>
                              The Fishing App
                          </Navbar.Text>
                          <Navbar.Form pullRight>
                              {
                                  logged_in ?
                                      (<Button bsStyle="success" onClick={logOut}>Log Out</Button>)
                                      :
                                      (<Button bsStyle="success" onClick={this.toggleModal}>Log In</Button>)
                              }
                          </Navbar.Form>
                      </Navbar.Collapse>
                  </Navbar>

                  {/*
                        login modal
                        triggered when state changes
                        calls parent login function
                  */}
                  <Modal
                      show={showing_modal}
                      onHide={this.toggleModal}
                      animation={true}

                  >
                      <Modal.Header closeButton>
                          <Modal.Title>Log In</Modal.Title>
                      </Modal.Header>
                      <form onSubmit={this.handleSubmit}>
                          <Modal.Body>
                              <FormGroup controlId="usrname">
                                  <ControlLabel>Username</ControlLabel>
                                  <FormControl
                                      autoFocus
                                      type="username"
                                      value={usrname}
                                      onChange={this.handleChange}
                                      placeholder={"Username"}
                                  />
                              </FormGroup>
                              <FormGroup controlId="passwd">
                                  <ControlLabel>Password</ControlLabel>
                                  <FormControl
                                      type="password"
                                      value={passwd}
                                      onChange={this.handleChange}
                                      placeholder={"Password"}
                                  />
                              </FormGroup>
                          </Modal.Body>
                          <Modal.Footer>
                              <Button type="submit">Log In</Button>
                          </Modal.Footer>
                      </form>
                  </Modal>
              </div>
          )
    }
}


export default AppNav;
