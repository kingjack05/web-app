import React, { Component } from "react"
import { connect } from "react-redux"

//Actions
import { readPatientData, updatePatientData } from "../../actions/patient"
import { openImportModuleModal } from "../../actions/modal"
//Components
import Tablist from "../Utilities/Tablist"
import PatientDetailsEditor from "./PatientDetailsEditor"
import NotesList from "./NotesList"

export class PatientDetails extends Component {
    componentDidMount() {
        this.props.readPatientData({ id: this.props.id })
    }
    tabs = [
        { label: "Patient Data", component: () => <PatientDetailsEditor id={this.props.id} /> },
        {
            label: "Notes",
            component: () => <NotesList patientID={this.props.id} />,
        },
    ]
    render() {
        return (
            <div>
                <Tablist tabs={this.tabs} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient })

const mapDispatchToProps = { readPatientData, updatePatientData, openImportModuleModal }

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails)
