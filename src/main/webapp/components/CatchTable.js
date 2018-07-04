import React from 'react';
import { Table } from 'react-bootstrap';

import print from '../util/Print'
import isEmpty from '../util/ArrayFunc'

import 'whatwg-fetch';


const CatchTable = props => {
   const {
        catches,
        showDetailModal
    } = props



    if (isEmpty(catches)) {
        print("CatchUploadQueue.showQueue", 'catches is empty')

        return(
            <Table responsive>
                <thead>
                <tr>
                    <th>Catch</th>
                    <th>Type of fish</th>
                    <th>Date</th>
                </tr>
                </thead>
            </Table>
        )
    }


    const table = () => {
        let rows = []

        for (let item in catches) {
            let c = catches[item]
            let date = new Date(c.dateCaught).toLocaleDateString()


            rows.push(
                <tr key={item} onClick={() => showDetailModal(c)}>
                    <td>{c.tripName}</td>
                    <td>{c.fishType}</td>
                    <td>{date}</td>
                </tr>
            )
        }


        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Catch</th>
                            <th>Type of fish</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        )
    }


    return table()
}

export default CatchTable;
