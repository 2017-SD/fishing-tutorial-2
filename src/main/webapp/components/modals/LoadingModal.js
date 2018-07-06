import React from 'react';
import { Modal } from 'react-bootstrap';

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
        </Modal>
    );
}

export default LoadingModal;
