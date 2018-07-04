import React, { Component } from 'react';
import { Button }           from 'react-bootstrap';

/** components */
import AppNav           from './AppNav';
import NewCatchModal    from './components/NewCatchModal'
import UploadQueue      from './components/CatchUploadQueue'
import CatchTable       from './components/CatchTable'
import CatchDetailModal from "./components/CatchDetailModal";

/** helper stuff */
import Store    from './offline/Store'
import print    from './util/Print'
import isEmpty  from './util/ArrayFunc'

import 'whatwg-fetch';

class App extends Component {
    constructor() {
        super();

        this.state = {
            logged_in: false,
            online: true,

            showing_nc_modal: false,        // new catch modal
            coordinates: {                  // coordinates for the form
                x: 0,
                y: 0,
            },

            queue: [],                      // offline upload queue
            posted_catches: [],             // catches in the db
            showing_detail_modal: false,    // catch detail modal
            display_catch: {},              // catch info to display
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

    /** checks location for autofilling coordinates in the form. */
    componentDidMount() {
        if (!navigator.geolocation){
            print("App.cdm", 'no geolocation')
            return
        }

        navigator.geolocation.getCurrentPosition(
            // success callback
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;


                if (latitude == null
                    || longitude == null) {
                    return
                }


                this.setState({
                    coordinates: {
                        x: latitude,
                        y: longitude
                    }
                })
            },

            // failure callback
            error => {
                print("App.cdm - geolocate: ", error, 1)
            }
        );
    }

    /** updates the online status */
    componentWillUpdate() {
        // if online status was changed
        const { online } = this.state

        if (online !== navigator.onLine)
            this.setState({online: navigator.onLine})
    }



    /** opens the new catch modal */
    showNewCatchModal = () => {
        this.setState({
            showing_nc_modal: true
        })
    }

    /** closes the new catch modal */
    hideNewCatchModal = () => {
        this.setState({
            showing_nc_modal: false
        })
    }

    /** opens the detail modal */
    showDetailModal = (c) => {
        this.setState({
            display_catch: c,
            showing_detail_modal: true
        })
    }

    /** closes the detail modal */
    hideDetailModal = () => {
        this.setState({
            display_catch: {},
            showing_detail_modal: false
        })
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



    /** stores the catch data in localforage */
    submitNewCatch = (data) => {
        alert("Saving catch in the queue to upload later.")
        Store.storeCatch(data)
            .then(d => {
                let cache = this.state.queue

                cache.push(d)

                this.setState({queue: cache})
            })
            .catch(e => {print("App.submitNewCatch.Store.storeCatchPromise", e, 1)})


        this.setState({
            showing_nc_modal: false,
        });
    }



    /** shows catches that have been uploaded */
    showCatches = () => {
        const url = "/catch/getCatches";

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',     // Need credentials so that the JSESSIONID cookie is sent
        })
            .then(r => {
                r.json().then(catches => {
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



    render() {
        const {
            logged_in,
            showing_nc_modal,
            coordinates,
            online,
            queue,
            posted_catches,
            showing_detail_modal,
            display_catch
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
        let catch_to_display = (display_catch !== {})

        return (
              <div>
                  <AppNav logged_in={logged_in}/>

                  { /* shows if there is a queue */
                      items_in_queue &&
                      <div>
                          <UploadQueue queue={list}/>
                          <br/>
                      </div>
                  }
                  { /* only upload if online & logged in */
                      items_in_queue && online && logged_in &&
                      <div>
                        <Button onClick={this.uploadQueue} bsStyle="success">Submit Pending Catches</Button>
                        <br/>
                      </div>
                  }
                  <Button onClick={this.showNewCatchModal} bsStyle="success">New Catch</Button>
                  <br/>
                  { /* only show catches if online & logged in */
                      online && logged_in &&
                      <div>
                          <Button onClick={this.showCatches} bsStyle="success">Show Your Catches</Button>
                          <br/>
                      </div>
                  }
                  { /* only show if there have been catches posted */
                      catches &&
                      <div>
                          <CatchTable
                              catches={posted_catches}
                              showDetailModal={this.showDetailModal}
                          />
                      </div>
                  }


                  {/* modals */}
                  <NewCatchModal
                      showing={showing_nc_modal}
                      hideModal={this.hideNewCatchModal}
                      coordinates={coordinates}
                      submitNewCatch={this.submitNewCatch}
                  />
                  {
                      catch_to_display &&
                      <CatchDetailModal
                          showing={showing_detail_modal}
                          hideModal={this.hideDetailModal}
                          selected_catch={display_catch}
                      />
                  }
              </div>
        );
    }
}

export default App;
