import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppNav from './AppNav'

//import getLogin from '../../../../controllers/fish/UserController'
import 'whatwg-fetch'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          logged_in: true,
        }
    }

    logIn() {
      this.setState({logged_in: true})
      // TODO login
      alert('LOGIN')
    }

    logOut() {
      this.setState({logged_in: false})
      // TODO logout
      alert('LOGOUT')
    }

    render() {
      return(
          <AppNav
              loggedIn={this.state.loggedIn}
              logIn={() => this.logIn()}
              logOut={() => this.logOut()}
          />
      )
    }
}

export default App;
