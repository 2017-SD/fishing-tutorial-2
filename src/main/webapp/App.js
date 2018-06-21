import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import AppNav from './AppNav';

import grailsLogo from './images/grails-cupsonly-logo-white.svg';
import reactLogo from './images/logo.svg';
import { SERVER_URL, CLIENT_VERSION, REACT_VERSION } from './config';
import 'whatwg-fetch';

class App extends Component {

    constructor() {
        super();

        this.state = {

        }
    }

    showCatches = () => {
        const url = "/catch/getCatches";

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',     // Need credentials so that the JSESSIONID cookie is sent
        })
          .then(r => {
              console.log(r)

              window.location = r.url
          })
    }

    loggedIn = () => {
        const url = "/user/getLogin";

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(r => {
              console.log(r)

              window.location = r.url
            })
    }

    render() {


        return (
              <div>
                  <Button onClick={this.showCatches}>get catches</Button>
                  <br/>
                  <Button onClick={this.loggedIn}>check if logged in</Button>

              </div>
        );
    }
}

export default App;
