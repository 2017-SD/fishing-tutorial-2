import React, { Component } from 'react'

import AppNav from './AppNav'

import 'whatwg-fetch'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            logged_in: false,
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
      return(
          <div>
              {/*
                    navbar
                    receives whether or not user is logged in
                    to know which function to call
               */}
              <AppNav
                  loggedIn={this.state.logged_in}
                  logIn={this.logIn}
                  logOut={this.logOut}
              />
          </div>
      )
    }
}

export default App;
