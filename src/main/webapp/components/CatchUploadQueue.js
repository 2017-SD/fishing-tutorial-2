import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types'

import print from '../util/Print'
import isEmpty from '../util/ArrayFunc'

import 'whatwg-fetch';


class UploadQueue extends Component {
    static propTypes = {
        queue: PropTypes.array
    }


    /** shows the upload queue */
    showQueue = () => {

        let queue = this.props.queue

        //print("CatchUploadQueue.showQueue", queue)

        if (isEmpty(queue)) {
            print("CatchUploadQueue.showQueue", 'queue is empty')

            return(<p></p>)
        }


        let rows = []

        for (let item in queue) {
            rows.push(
                <tr>
                    <td>{queue[item]}</td>
                </tr>
            )
        }

        return (
            <Table responsive>
                <thead>
                    <tr><th>Catch Queue</th></tr>
                </thead>

                <tbody>
                    {rows}
                </tbody>
            </Table>
        )

        //return table
    }


    render() {
        //print("CatchUploadQueue.render", this.props.queue)

        let table = this.showQueue()

        return(table)
    }

}

export default UploadQueue;
