import React, { Component } from 'react'
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import AppNav from './AppNav'


import 'whatwg-fetch'

class App extends Component {
    /** STATE */

    constructor() {
        super()

        this.state = {
            logged_in: false,
            showing_modal: false,

            user_details: {
                username: '',
                password: ''
            }
        }
    }


    /* END STATE */



    /** LIFECYCLE FUNCTIONS */

    // componentDidMount() {
    //
    // }
    //
    // componentDidUpdate() {
    //
    // }

    /* END LIFECYCLE FUNCTIONS */



    /** LOGIN/LOGOUT FUNCTIONS */

    logIn = () => {
        alert('LOGIN')
    }

    logOut = () => {

        alert('LOGOUT')
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
        }  = this.state


        return(
            <div>
                {/*
                    navbar
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

                <h3>{logged_in ? 'logged in!' : null}</h3>

            </div>
        )

    }
}

export default App;
