import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import AppNav from './AppNav';
import NewCatchModal from './components/NewCatchModal'
import UploadQueue from './components/CatchUploadQueue'
import CatchTable from './components/CatchTable'

import Store from './offline/Store'
import print from './util/Print'
import isEmpty from './util/ArrayFunc'

import 'whatwg-fetch';
import CatchDetailModal from "./components/CatchDetailModal";

class App extends Component {
    constructor() {
        super();

        this.state = {
            logged_in: false,
            online: true,

            showing_nc_modal: false,

            queue: [],                      // offline upload queue
            posted_catches: [],
            // showing_detail_modal: false,
            // display_catch: [],              // catch info to display
        }
    }


    // TODO
    /** checks for online & logged in status */
    componentWillMount() {
        // check if online
        this.setState({online: navigator.onLine})


        if (this.state.online) {
            // check if a service worker is supported then register it
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('./sw.js')
                    .then( (r) => { print("App.cwm - service worker registered", r.scope); });
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
                if (isEmpty(q)) {
                    return
                }

                this.setState({queue: q})
            })
            .catch(e => {print("App.cwm.Store.getQueuePromise", e, 1)})
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

    showDetailModal = (c) => {
        this.setState({
            display_catch: c,
            showing_detail_modal: true
        })
    }

    hideDetailModal = () => {
        this.setState({showing_detail_modal: false})
    }


    /** helper to get queue items */
    getQueue = () => {
        let list = []
        let q = this.state.queue

        for (let item in q) {
            list.push(q[item].tripName)
        }

        return list
    }


    /** uploads the queue */
    uploadQueue = () => {
        Store.submitQueue()
            .then(() => {this.setState({queue: []})})
            .catch((e) => {print("App.uploadQueue", e, 1)})
    }


    /** sends user to show catches that have been uploaded */
    showCatches = () => {
        const url = "/catch/getCatches";

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',     // Need credentials so that the JSESSIONID cookie is sent
        })
            .then(r => {
                r.json()
                    .then(catches => {
                        //print("App.showCatches", catches)

                        if (!isEmpty(catches)) {
                            let c = []

                            for (let fish in catches) {
                                c.push(catches[fish])
                            }


                            this.setState({posted_catches: c})
                        }
                    })
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
                    print("App.submitnewcatch.fetch", r.status)
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
                .catch(e => {print("App.submitNewCatch.Store.storeCatchPromise", e, 1)})
        }


        this.setState({
            showing_nc_modal: false,
        });
    }


    render() {

        const {
            logged_in,
            showing_nc_modal,
            online,
            queue,
            posted_catches
        } = this.state


        // for upload queue
        let items_in_queue = false
        let list = []

        if (!isEmpty(queue)) {
            list = this.getQueue()


            items_in_queue = true
        }


        // for posted catches
        let catches = (!isEmpty(posted_catches))

        //print("App.render", posted_catches)

        return (
              <div>
                  <AppNav logged_in={logged_in}/>

                  { /* shows if there is a queue */
                      items_in_queue &&
                      <UploadQueue queue={list}/>
                  }
                  <br/>
                  { /* only upload if online & logged in */
                      items_in_queue && online && logged_in &&
                      <Button onClick={this.uploadQueue} bsStyle="success">Submit Pending Catches</Button>
                  }
                  <br/>
                  <Button onClick={this.showNewCatchModal} bsStyle="success">New Catch</Button>
                  <br/>
                  { /* only show catches if online & logged in */
                      online && logged_in &&
                      <Button onClick={this.showCatches} bsStyle="success">Show Your Catches</Button>
                  }
                  <br/>
                  { /* only show if there have been catches posted */
                      catches &&
                      <CatchTable
                          catches={posted_catches}
                          //showDetailModal={this.showDetailModal}
                      />
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
