import React from 'react';
import { Table } from 'react-bootstrap';

import print from '../util/Print'
import isEmpty from '../util/ArrayFunc'

import 'whatwg-fetch';


/** shows the upload queue */
const UploadQueue = props => {
    const { queue } = props


    if (isEmpty(queue)) {
        print("CatchUploadQueue.showQueue", 'queue is empty')
        return
    }


    const table = () => {
        let rows = []


        for (let item in queue) {
            rows.push(
                <tr key={item}>
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
    }


    return table()
}

export default UploadQueue;
