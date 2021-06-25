import React, { Component } from "react"
import { connect } from "react-redux"
import history from "../../history"

import DatapointAutocomplete from "../Search/DatapointAutocompleteCombobox"

export class BrowseDatapoint extends Component {
    onChange = (id) => {
        history.push(`/browse/datapoint/${id}`)
    }
    render() {
        return (
            <div>
                <DatapointAutocomplete onChange={this.onChange} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseDatapoint)
