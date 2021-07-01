import React, { Component } from "react"
import { connect } from "react-redux"

import Tablist from "../Utilities/Tablist"
import Workups from "./Workups"

import { readPatientNote } from "../../actions/patient"

export class NoteDetails extends Component {
    componentDidMount() {
        this.props.readPatientNote(this.props.noteID, this.props.patientID)
    }
    tabs = [
        { label: "Note Data", component: () => <div>Note data</div> },
        { label: "Workups", component: () => <Workups /> },
    ]
    render() {
        return (
            <div>
                <Tablist tabs={this.tabs} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { readPatientNote }

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)
