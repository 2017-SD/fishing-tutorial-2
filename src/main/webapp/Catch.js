import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import { SERVER_URL } from './config'
import headers from './security/headers'

import 'whatwg-fetch'


class Catch extends Component {
    constructor() {
        super()

        this.state = {
            catches: [],
            fishers: []
        }
    }

    componentDidMount() {
        fetch(`${SERVER_URL}/catch/getCatches`, {
            method: 'GET',
            headers: headers(),
        })
            .then(r => r.json())
            .then(json => {
                this.setState({catches: json})
            })
            .catch(error => console.error('Error retrieving catches: ' + error));


        fetch(`${SERVER_URL}/api/fisher`, {
            method: 'GET',
            headers: headers()
        })
            .then(r => r.json())
            .then(json => this.setState({fishers: json}))
            .catch(error => console.error('Error retrieving fishers: ' + error));
    }

    testing = () => {
        const {
            catches,
            fishers,
        } = this.state


        fetch(`${SERVER_URL}/catch/getCatches`, {
            method: 'GET',
            headers: headers(),
        })
            .then(r => r.json())
            .then(json => {
                this.setState({catches: json})
            })
            .catch(error => console.error('Error retrieving catches: ' + error));


        console.log(`catches: ${JSON.stringify(catches)}\nfishers: ${JSON.stringify(fishers)}`)
    }


    render() {
        return(
            <div className="text-center">
                <Button
                    bsStyle="success"
                    onClick={this.testing}
                >
                    New Catch
                </Button>
            </div>
        )
    }

}

export default Catch;
