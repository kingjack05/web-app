import React, { Component } from "react"
import { connect } from "react-redux"

//components
import CreateNewPatientModal from "./CreateNewPatientModal"
import Patient from "./Patient"
//actions
import { openCreateNewPatientModal } from "../../actions/modal"
import { readPatientList } from "../../actions/patient"

export class PatientList extends Component {
    componentDidMount() {
        this.props.readPatientList()
    }
    renderPatientList = () => {
        return this.props.patient.patients.map((element) => {
            const {
                _id,
                age,
                sex,
                presentDiagnosis,
                shortSummary,
                title,
            } = element
            return (
                <div>
                    <Patient
                        key={_id}
                        id={_id}
                        age={age}
                        sex={sex}
                        presentDiagnosis={presentDiagnosis}
                        shortSummary={shortSummary}
                        title={title}
                    />
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.props.openCreateNewPatientModal}>
                    Add new patient
                </button>
                <CreateNewPatientModal />
                Patient List
                {this.renderPatientList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient })

const mapDispatchToProps = { openCreateNewPatientModal, readPatientList }

export default connect(mapStateToProps, mapDispatchToProps)(PatientList)
