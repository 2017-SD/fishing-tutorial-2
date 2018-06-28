import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import AppNav from './AppNav';
import NewCatchModal from './components/NewCatchModal'

import Store from './offline/Store'

import 'whatwg-fetch';

class App extends Component {
    constructor() {
        super();

        this.state = {
            logged_in: false,
            online: true,

            showing_nc_modal: false,
            // offline upload queue
            queue: [],
        }
    }


    /** checks for online & logged in status */
    componentWillMount() {
        // check if online
        this.setState({online: navigator.onLine})


        if (this.state.online) {
            // check if a service worker is supported then register it
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('./sw.js')
                    .then( () => { console.log("Service Worker Registered"); });
            }
        }

        // check if logged in
        const url = "/user/getLogin";

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(r => r.text())
            .then(text => {
                if (text === 'false'){
                    this.setState({logged_in: false})
                }

                else {
                    this.setState({logged_in: true})
                }
            })


        // get upload queue
        Store.getQueue()
            .then(q => {
                let cache = this.state.queue

                cache.push(q)

                this.setState({queue: cache})
            })
            .catch(e => {console.error('error retrieving catches: ', e)})
    }


    /** updates the online status */
    componentWillUpdate() {
        // if online status was changed
        const { online } = this.state

        if (online !== navigator.onLine)
            this.setState({online: navigator.onLine})
    }


    /** opens the modal */
    showNewCatchModal = () => {
        this.setState({
            showing_nc_modal: true
        })
    }

    /** closes the modal */
    hideNewCatchModal = () => {
        this.setState({
            showing_nc_modal: false
        })
    }


    /** shows the upload queue in the console for now */
    showQueue = () => {
        console.log(this.state.queue)
    }

    /** uploads the queue */
    uploadQueue = () => {
        // puts the image back in the dictionary to be posted
        Store.submitQueue()
    }


    /** sends user to show catches that have been uploaded */
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


    /**
     * saves the new catch data if online & logged in
     * stores it if not
     * @param data - catch data
     */
    submitNewCatch = (data) => {
        const {
            online,
            logged_in
        } = this.state


        // post to grails
        if (online && logged_in) {
            let formDat = new FormData()

            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    formDat.append(key, data[key])
                }
            }


            const url = "/catch/newCatch";

            fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                body: formDat
            })
                .then(r =>  {
                    console.log(`in app.submitnewcatch fetch: response status: ${r.status}`)
                })
        }

        // save in localforage
        else {
            alert("saving catch in queue to upload later.")
            Store.storeCatch(data)
                .then(d => {
                    let cache = this.state.queue

                    cache.push(d)

                    this.setState({queue: cache})
                })
                .catch(e => {console.error('error storing catch: ', e)})
        }


        this.setState({
            showing_nc_modal: false,
        });
    }


    render() {

        const {
            logged_in,
            showing_nc_modal,
            online
        } = this.state


        return (
              <div>
                  <AppNav logged_in={logged_in}/>

                  { /* only show catches if online */
                      online &&
                      <Button onClick={this.showCatches} bsStyle="success">show catches</Button>
                  }
                  <br/>
                  <Button onClick={this.showNewCatchModal} bsStyle="success">new catch</Button>
                  <br/>
                  <Button onClick={() => {console.log(`online: ${online}`)}}>online?</Button>
                  <br/>
                  <Button onClick={this.showQueue}>show queue in console.</Button>
                  <br/>
                  { /* only upload if online & logged in */
                      online && logged_in &&
                      <Button onClick={this.uploadQueue} bsStyle="success">Submit catch queue</Button>
                  }


                  <NewCatchModal
                      showModal={showing_nc_modal}
                      handleHideModal={this.hideNewCatchModal}
                      submitNewCatch={this.submitNewCatch}
                  />
              </div>
        );
    }
}

export default App;
