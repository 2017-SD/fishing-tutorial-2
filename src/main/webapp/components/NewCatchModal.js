import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import NewCatchForm from './NewCatchForm'

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

    componentWillMount() {
        // checks location for autofilling coordinates.
        if (!navigator.geolocation){
            console.log('no geolocation')
            return
        }


        navigator.geolocation.getCurrentPosition(position => {
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
            error => {
                console.error("form.coords, couldn't get location: ", error)
            });
    }

    handleHideModal = () => {
        this.props.handleHideModal()
    }

    render() {
        const {
            showModal,
            submitNewCatch
        } = this.props

        const coordinates = this.state


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
