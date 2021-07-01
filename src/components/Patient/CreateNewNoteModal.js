import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"

import { openCreateNewNoteModal, closeCreateNewNoteModal } from "../../actions/modal"
import { readPatientNoteList, createPatientNote } from "../../actions/patient"

import StyledModal from "../Utilities/StyledModal"

const encounterTypeOptions = [
    "Ambulatory",
    "Emergency",
    "Home health",
    "Inpatient",
    "Outpatient",
    "Virtual",
]

export class CreateNewNoteModal extends Component {
    submitCreateNewNoteForm = async (formValues) => {
        await this.props.createPatientNote(formValues, this.props.patientID)
        await this.props.readPatientNoteList(this.props.patientID)
        await this.props.closeCreateNewNoteModal()
    }
    render() {
        return (
            <div>
                <StyledModal
                    isOpen={this.props.modal.createNewNoteModalIsOpen}
                    onBackgroundClick={this.props.closeCreateNewNoteModal}
                    onEscapeKeydown={this.props.closeCreateNewNoteModal}
                >
                    <Form onSubmit={this.submitCreateNewNoteForm}>
                        {({ handleSubmit, submitting, pristine }) => (
                            <form onSubmit={handleSubmit}>
                                {" "}
                                <div>
                                    <label>Title</label>
                                    <Field
                                        name="title"
                                        component="input"
                                        type="text"
                                        placeholder="Title"
                                    ></Field>
                                </div>
                                <div>
                                    <label>Encounter Type</label>
                                    <Field name="encounterType" component="select">
                                        <option />
                                        {encounterTypeOptions.map((element) => (
                                            <option value={element} key={element}>
                                                {element}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div>
                                    <label>Short Summary</label>
                                    <Field name="shortSummary" component="textarea"></Field>
                                </div>
                                <div>
                                    <button type="submit" disabled={submitting || pristine}>
                                        Create Note
                                    </button>
                                </div>
                            </form>
                        )}
                    </Form>
                </StyledModal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ modal: state.modal })

const mapDispatchToProps = {
    openCreateNewNoteModal,
    closeCreateNewNoteModal,
    readPatientNoteList,
    createPatientNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewNoteModal)
