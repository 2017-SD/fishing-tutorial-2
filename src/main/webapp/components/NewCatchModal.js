import React from 'react';
import { Modal } from 'react-bootstrap';

import NewCatchForm from './NewCatchForm'

import 'whatwg-fetch';


const NewCatchModal = props => {
    const {
        coordinates,
        showing,
        hideModal,
        submitNewCatch
    } = props;


    return (
        <Modal show={showing} onHide={hideModal}>
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


export default NewCatchModal;
