import React, { Component } from 'react'
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import AppNav from './AppNav'
import Catch from './Catch'

import { SERVER_URL } from './config';

import Auth from './security/auth';

import { defaultErrorHandler } from './handlers/errorHandlers';
import { checkResponseStatus, loginResponseHandler } from './handlers/responseHandlers';

import 'whatwg-fetch'

class App extends Component {
    /** STATE FUNCTIONS */

    constructor() {
        super()

        this.state = {
            logged_in: false,
            showing_modal: false,

            user_details: {
                username: '',
                password: ''
            },

            route: '',
            error: null
        }
    }

    reset = () => {
        this.setState({
            logged_in: false,

            user_details: {
                username: '',
                password: ''
            },

            route: 'login',
            error: null
        })
    }


    /* END STATE FUNCTIONS */



    /** LIFECYCLE FUNCTIONS */

    componentDidMount() {
        console.log('mounting...');

        (async () => {
            if (await Auth.loggedIn()) {
                this.setState({route: 'catch'})
            }

            else {
                this.setState({route: 'login'})
            }
        })();

        console.log(`route: ${this.state.route}`)
    }

    componentDidUpdate() {
        if (this.state.route !== 'login' && !Auth.loggedIn()) {
            this.setState({route: 'login'})
        }
    }

    /* END LIFECYCLE FUNCTIONS */



    /** LOGIN/LOGOUT FUNCTIONS */

    // handles logging the user in
    logIn = (e) => {
        console.log('login')
        e.preventDefault()



        fetch(`${SERVER_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user_details)
        }).then(checkResponseStatus)
            .then(response => loginResponseHandler(response, this.loginHandler))
            .catch(error => defaultErrorHandler(error, this.errorHandler))

        this.setState({logged_in: true})
    }

    // handles logging the user out
    logOut = () => {
        Auth.logOut();
        this.reset();
    }

    loginHandler = () => {
        this.setState({route: 'catch'})
    }

    errorHandler = (error) => {
        this.reset()
        this.setState({error: error.message})

        alert(this.state.error)
    }

    /* END LOGIN/LOGOUT FUNCTIONS */



    /** MODAL FUNCTIONS */

    // updates the form field being changed
    formInputChangeHandler = (e) => {
        let {user_details} = this.state
        let tg = e.target

        user_details[tg.id] = tg.value

        this.setState({user_details})
    }


    // opens and closes modal
    toggleModal = () => {
        let showing = !this.state.showing_modal

        this.setState({showing_modal: showing})
    }


    /* END MODAL FUNCTIONS */


    render() {

        const {
            logged_in,
            showing_modal,
            user_details,
            route,
        }  = this.state


        return(
          <div>
              {/*
                    navbar
                    receives whether or not user is logged in
                    to know which function to call
               */}
              <AppNav
                  showModal={this.toggleModal}
                  logged_in={logged_in}
                  logOut={this.logOut}
              />


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
                  <Form onSubmit={this.logIn}>
                      <Modal.Body>
                          <FormGroup controlId="username">
                              <ControlLabel>Username</ControlLabel>
                              <FormControl
                                  autoFocus
                                  type="username"
                                  onChange={this.formInputChangeHandler}
                                  value={user_details.username}
                                  placeholder={"Username"}
                              />
                          </FormGroup>
                          <FormGroup controlId="password">
                              <ControlLabel>Password</ControlLabel>
                              <FormControl
                                  type="password"
                                  value={user_details.password}
                                  onChange={this.formInputChangeHandler}
                                  placeholder={"Password"}
                              />
                          </FormGroup>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button type="submit">Log In</Button>
                      </Modal.Footer>
                  </Form>
              </Modal>

              {/*
                    new catch button
                    only shows when logged in
              */

                  logged_in && <Catch/>
              }

          </div>
        )
    }
}

export default App;
