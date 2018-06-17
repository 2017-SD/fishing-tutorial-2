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

    reset = () => {
        this.setState({
            logged_in: false,
            showing_modal: false,

            user_details: {
                username: '',
                password: ''
            }
        })
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

    logIn = (e) => {
        e.preventDefault()

        const data = new FormData(e.target)

        // log in
        fetch('/login/authenticate', {
            method: 'POST',
            body: data
        }).then(r => {
            console.log(JSON.stringify(r))

            // check to see if user is logged in
                fetch('/user/getLogin', {
                    method: 'GET'
                }).then(r => r.json())
                    .then(json => console.log(`Logged in: ${JSON.stringify(json)}`))
                    .catch(error => console.error(`Error viewing login status: ${error}`))

        })
            // .then(json => {

            // })
            .catch(error => console.error(`Error logging in: ${error}`))

        // check to see if user is logged in
        //     fetch('/user/getLogin', {
        //         method: 'GET'
        //     }).then(r => r.json())
        //         .then(json => console.log(`Logged in: ${JSON.stringify(json)}`))
        //         .catch(error => console.error(`Error logging in: ${error}`))

    }

    logOut = () => {

        alert('LOGOUT')

        this.reset()
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

                        <Modal.Body>
                            <form onSubmit={this.logIn} action={"POST"} autoComplete="off">
                                <p>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text"
                                           value={user_details.username}
                                           onChange={this.formInputChangeHandler}
                                           id="username"
                                    />
                                </p>

                                <p>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password"
                                           value={user_details.password}
                                           onChange={this.formInputChangeHandler}
                                           id="password"
                                    />
                                </p>
                                <Button type="submit">Log In</Button>
                            </form>
                        </Modal.Body>
                </Modal>

                <h3>{logged_in ? 'logged in!' : ''}</h3>

            </div>
        )

    }
}

export default App;
