import React from 'react';
import { Modal, Image } from 'react-bootstrap';


const CatchDetailModal = props => {
    const {
        showing,
        hideModal,
        selected_catch
    } = props

    let img_attached = (selected_catch.image !== null)

    let img = img_attached ? `../images/uploaded/${selected_catch.image}` : ''

    let date = new Date(selected_catch.dateCaught).toLocaleDateString()


    return (
        <Modal show={showing} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selected_catch.tripName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Date: </b><span>{date}</span>
                <br/>
                <b>Fish type: </b><span>{selected_catch.fishType}</span>
                <br/>
                <b>Comments: </b><span>{selected_catch.comment}</span>
                <br/>
                <b>Location: </b><span>{selected_catch.xCoord}, {selected_catch.yCoord}</span>
                <br/>
                { /* only displays if there is an image */
                    img_attached &&
                    <div style={{width: 250, height: 'auto'}}>
                        <Image src={img} responsive/>
                    </div>
                }
            </Modal.Body>
        </Modal>
    );
}

export default CatchDetailModal;
