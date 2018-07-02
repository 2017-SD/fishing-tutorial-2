import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import NewCatchForm from './NewCatchForm'

import print from '../util/Print'

import 'whatwg-fetch';


class NewCatchModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: {
                x: 0.0,
                y: 0.0
            }
        }
    }


    /** checks location for autofilling coordinates in the form. */
    componentWillMount() {
        if (!navigator.geolocation){
            print("NewCatchModal.cwm", 'no geolocation')
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
                print("NewCatchModal.cwm: ", error, 1)
            }
        );
    }


    /** closes the modal */
    handleHideModal = () => {
        this.props.handleHideModal()
    }



    render() {
        const {
            showModal,
            submitNewCatch
        } = this.props

        const coordinates = this.state.coordinates


        return (
            <Modal show={showModal} onHide={this.handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Catch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCatchForm
                        submitNewCatch={submitNewCatch}
                        coordinates={coordinates}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}


export default NewCatchModal;
