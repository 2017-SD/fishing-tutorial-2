import React, { Component } from 'react';
import { Button, FormControl, FormGroup, ControlLabel, ButtonToolbar } from 'react-bootstrap';

import 'whatwg-fetch';

class NewCatchForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // form fields
            tripName: '',
            fishType: '',
            dateCaught: '',
            xCoord: this.props.coordinates.x,
            yCoord: this.props.coordinates.y,
            comment: '',
            image: null,
        }
    }


    /** validates form */
    valid = () => {
        const {
            tripName,
            fishType,
            dateCaught,
            xCoord,
            yCoord
        } = this.state

        if (tripName === '') {
            alert('Enter a trip name!')
            this.setState({valid_form: false})
            return false
        }
        else if (fishType === '') {
            alert('Enter a type of fish!')
            this.setState({valid_form: false})
            return false
        }
        else if (dateCaught === '') {
            alert('Enter a date!')
            this.setState({valid_form: false})
            return false
        }
        else if ((xCoord !== 0 && isNaN(xCoord))
                || (yCoord !== 0 && isNaN(yCoord))) {
            alert('Coordinates must be numbers!')
            this.setState({valid_form: false})
            return false
        }

        return true
    }



    /** submits the form if valid */
    handleSubmit = (e) => {
        e.preventDefault();


        if (!this.valid()) {
            //alert('Please correct any form errors.')
            return
        }


        const data = {
            tripName: this.state.tripName,
            fishType: this.state.fishType,
            dateCaught: this.state.dateCaught,
            xCoord: this.state.xCoord,
            yCoord: this.state.yCoord,
            comment: this.state.comment,
            image: this.state.image
        }


        this.props.submitNewCatch(data)
    }


    /** form update handlers */
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    handleImg = (e) => {
        const target = e.target;
        const file = target.files[0]


        this.setState({
            image: file
        })
    }
    /* end update handlers */

    render() {

        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup
                    controlId="formControlsTripName"
                >
                    <ControlLabel>Trip Name</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="The name of your trip..."
                        name="tripName"
                        onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup
                    controlId="formControlsFishType"
                >
                    <ControlLabel>Fish Type</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="The type of fish you caught..."
                        name="fishType"
                        onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup
                    controlId="formControlsDateCaught"
                >
                    <ControlLabel>Date Caught</ControlLabel>
                    <FormControl
                        type="date"
                        placeholder="The type of fish you caught..."
                        name="dateCaught"
                        onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup
                    controlId="formControlsXCoord"
                >
                    <ControlLabel>X-Coordinate</ControlLabel>
                    <FormControl
                        type="num"
                        value={this.state.xCoord}
                        name="xCoord"
                        onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup
                    controlId="formControlsYCoord"
                >
                    <ControlLabel>Y-Coordinate</ControlLabel>
                    <FormControl
                        type="num"
                        value={this.state.yCoord}
                        name="yCoord"
                        onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup
                    controlId="formControlsComment"
                >
                    <ControlLabel>Comment</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Anything you would like to mention?"
                        name="comment"
                        onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup
                    controlId="formControlsImage"
                >
                    <ControlLabel>Upload Image</ControlLabel>
                    <FormControl
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={this.handleImg}
                        capture
                    />
                </FormGroup>

                <ButtonToolbar>
                    <Button id="submit-btn" bsStyle="warning" type="submit">Submit</Button>
                </ButtonToolbar>
            </form>
        );
    }
}


export default NewCatchForm;
