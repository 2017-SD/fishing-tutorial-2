import React from 'react'
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
        fetch(`${SERVER_URL}/api/catch`, {
            method: 'GET',
            headers: headers(),
        })
            .then(r => r.json())
            .then(json => this.setState({catches: json}))
            .catch(error => console.error('Error retrieving catches: ' + error));


        fetch(`${SERVER_URL}/api/fisher`, {
            method: 'GET',
            headers: headers()
        })
            .then(r => r.json())
            .then(json => this.setState({fishers: json}))
            .catch(error => console.error('Error retrieving fishers: ' + error));
    }


    render() {
        const {
            catches,
            fishers,
        } = this.state


        return(
            <div>
                <Button bsStyle="success" onClick={() => console.log(`catches: ${catches}\nfishers: ${fishers}`)}>New Catch</Button>
            </div>
        )
    }

}

export default Catch;
