import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

import 'whatwg-fetch'
import PropTypes from "prop-types";

class LoginModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showing: false
        }
    }

    render() {

        return (
            <div>
                <Modal open={this.state.showing} onRequestClose={this.close}>
                <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default LoginModal;
