import React, { Component } from 'react';
import { Button }           from 'react-bootstrap';

/** components */
import AppNav           from './AppNav';
import UploadQueue      from './components/CatchUploadQueue'
import CatchTable       from './components/CatchTable'
import NewCatchModal    from './components/modals/NewCatchModal'
import CatchDetailModal from './components/modals/CatchDetailModal';
import LoadingModal     from './components/modals/LoadingModal'

/** helper stuff */
import Store    from './util/Store'
import print    from './util/Print'
import isEmpty  from './util/ArrayFunc'

import 'whatwg-fetch';

class App extends Component {
    constructor() {
        super();

        this.state = {
            logged_in: false,
            online: true,

            showing_loading_modal: false,   // modal indicating something is loading
            loading_message: '',            // message to display on the modal

            showing_nc_modal: false,        // new catch modal

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
                    .then( () => { print("App.cwm - service worker registered."); })
                    .catch(e => print("App.cwm - service worker", e, 1))
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
        }


        this.showLoadingModal('LOADING UPLOAD QUEUE...')

        // get upload queue
        Store.getQueue()
            .then(q => {
                this.setState({queue: []})

                if (isEmpty(q)) {
                    return
                }

                this.setState({queue: q})
            })
            .catch(e => {
                print("App.cwm.Store.getQueuePromise", e, 1)
            })

        this.hideLoadingModal()
    }

    /** updates the online status */
    componentWillUpdate() {
        // if online status was changed
        const { online } = this.state

        if (online !== navigator.onLine)
            this.setState({online: navigator.onLine})
    }


    /** opens the loading modal */
    showLoadingModal = m => {
        this.setState({
            loading_message: m,
            showing_loading_modal: true
        })
    }

    /** closes the loading modal */
    hideLoadingModal = () => {
        this.setState({
            showing_loading_modal: false,
            loading_message: ''
        })
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
    showDetailModal = c => {
        this.setState({
            display_catch: c,
            showing_detail_modal: true
        })
    }

    /** closes the detail modal */
    hideDetailModal = () => {
        this.setState({
            showing_detail_modal: false,
            display_catch: {}
        })
    }



    /** uploads the queue */
    uploadQueue = () => {
        this.showLoadingModal('UPLOADING CATCH QUEUE...')

        Store.submitQueue()
            .then(m => {
                this.setState({queue: []})

                alert(m)
            })
            .catch(e => {
                print("App.uploadQueue", e, 1)
            })

        this.hideLoadingModal()
    }



    /** stores the catch data in localforage */
    submitNewCatch = data => {
        alert("Saving catch in the upload queue.")

        this.showLoadingModal('STORING CATCH IN QUEUE...')

        Store.storeCatch(data)
            .then(d => {
                let cache = this.state.queue

                cache.push(d)

                this.setState({queue: cache})
            })
            .catch(e => {print("App.submitNewCatch.Store.storeCatchPromise", e, 1)})

        this.hideLoadingModal()


        this.setState({
            showing_nc_modal: false,
        });
    }


    /** shows catches that have been uploaded */
    showCatches = () => {
        this.showLoadingModal('RETRIEVING CATCHES...')

        const url = "/catch/getCatches";

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',     // Need credentials so that the JSESSIONID cookie is sent
        })
            .then(r => {
                r.json()
                    .then(catches => {
                        if (!isEmpty(catches)) {
                            let c = []

                            for (let fish in catches) {
                                c.push(catches[fish])
                            }

                            this.setState({posted_catches: c})

                            this.hideLoadingModal()
                        }
                    })
                    .catch(e => print("App.ShowCatches", e, 1))
            })
    }



    render() {
        const {
            logged_in,
            showing_nc_modal,
            online,
            queue,
            posted_catches,
            showing_detail_modal,
            display_catch,
            showing_loading_modal,
            loading_message
        } = this.state


        // all items true if not empty
        let items_in_queue      = (!isEmpty(queue))             // for upload queue
        let catches             = (!isEmpty(posted_catches))    // for posted catches
        let catch_to_display    = (display_catch !== {})        // for catch detail modal


        return (
              <div>
                  <AppNav
                      logged_in={logged_in}
                      online={online}
                  />

                  { /* shows if there is a queue */
                      items_in_queue &&
                      <div>
                          <UploadQueue queue={queue}/>
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
                  <LoadingModal
                      showing={showing_loading_modal}
                      hideModal={this.hideLoadingModal}
                      message={loading_message}
                  />
                  <NewCatchModal
                      showing={showing_nc_modal}
                      hideModal={this.hideNewCatchModal}
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
