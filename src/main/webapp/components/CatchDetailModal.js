import React, { Component } from 'react';
import { Modal, Image } from 'react-bootstrap';
import PropTypes from 'prop-types'



import print from '../util/Print'


class CatchDetailModal extends Component {
    constructor(props) {
        super(props);

        let c = JSON.parse(this.props.selected_catch)

        //print("CatchDetailModal.constructor:", c)
        //print("CatchDetailModal.constructor:", c.image)

        this.state = {
            selected_catch: c,
            img_attached: (c.image !== null && c.image !== undefined)
        }
    }


    render() {
        const {
            showModal,
            handleHideModal
        } = this.props

        let {
            selected_catch,
            img_attached
        } = this.state

        print("CatchDetailModal.render:", img_attached)

        let date = new Date(selected_catch.dateCaught).toLocaleDateString()


        const img = img_attached ? `../images/uploaded/${selected_catch.image}` : ''


       // print("CatchDetailModal.render", images)

        return (
            <Modal show={showModal} onHide={handleHideModal}>
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
}

export default CatchDetailModal;
