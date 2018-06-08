import React, { Component } from 'react'

import AppNav from './AppNav'

import { SERVER_URL } from './config';

import Auth from './security/auth';

import { defaultErrorHandler } from './handlers/errorHandlers';
import { checkResponseStatus, loginResponseHandler } from './handlers/responseHandlers';

import 'whatwg-fetch'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            logged_in: false,
            // showing_modal: false,
            // usrname: "",
            // passwd: "",
        }
    }

    // handles logging the user in
    logIn = (usrname, passwd) => {
        this.setState({logged_in: true})
        // TODO login
        console.log(`IN LOGIN: ${usrname} | ${passwd}`)
        //console.log(`IN LOGIN: logged_in: ${this.state.logged_in}`)
    }

    // handles logging the user out
    logOut = () => {
        this.setState({logged_in: false})
        // TODO logout

        console.log(`IN LOGOUT: logged_in: ${this.state.logged_in}`)
    }

    render() {

      const {
          logged_in,
      }  = this.state

      return(
          <div>
              {/*
                    navbar
                    receives whether or not user is logged in
                    to know which function to call
               */}
              <AppNav
                  loggedIn={logged_in}
                  logIn={this.logIn}
                  logOut={this.logOut}
              />

              {/*
                    TODO
                    new catch button
              */}
          </div>
      )
    }
}

export default App;
