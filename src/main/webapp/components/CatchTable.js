import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types'

import CatchDetailModal from "./CatchDetailModal";

import print from '../util/Print'
import isEmpty from '../util/ArrayFunc'

import 'whatwg-fetch';


class CatchTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            catches: this.props.catches,
            display_catch: '',
            showing_detail_modal: false
        }
        //console.log("CatchTable.constructor", this.state.catches)
    }

    showDetailModal = (c) => {
        this.setState({
            display_catch: JSON.stringify(c)
        })

        this.setState({
            showing_detail_modal: true
        })
    }

    hideDetailModal = () => {
        this.setState({
            showing_detail_modal: false,
            display_catch: ''
        })
    }


    showCatches = () => {
        //print("CatchTable.showCatches - props:", this.props)

        let catches = this.state.catches

        //print("CatchTable.showCatches - catches", catches)

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


        let {
            display_catch,
            showing_detail_modal
        } = this.state

        let rows = []

        for (let item in catches) {
            let c = catches[item]
            let date = new Date(c.dateCaught).toLocaleDateString()

            // print("CatchTable.render - loop c", c)
            // print("CatchTable.render - loop item", item)


            rows.push(
                <tr onClick={() => this.showDetailModal(c)}>
                    <td>{c.tripName}</td>
                    <td>{c.fishType}</td>
                    <td>{date}</td>
                </tr>
            )
        }



        let catch_to_display = (display_catch !== '')

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

                {
                    catch_to_display &&
                    <CatchDetailModal
                        showModal={showing_detail_modal}
                        handleHideModal={this.hideDetailModal}
                        selected_catch={display_catch}
                    />
                }
            </div>
        )
    }


    render() {

        let table = this.showCatches()

        return(table)
    }
}

export default CatchTable;
