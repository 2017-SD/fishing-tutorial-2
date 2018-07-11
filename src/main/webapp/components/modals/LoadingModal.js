import React from 'react';
import { Modal } from 'react-bootstrap';

import spinner from '../../images/spinner.gif'

const LoadingModal = props => {
    const {
        showing,
        hideModal,
        message
    } = props;


    return (
        <Modal show={showing} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{message}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {spinner}
            </Modal.Body>
        </Modal>
    );
}

export default LoadingModal;
