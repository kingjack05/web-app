import React, { Component } from "react"
import { connect } from "react-redux"
import Modal from "styled-react-modal"
import { Form, Field } from "react-final-form"

import { openCreateNewPatientModal, closeCreateNewPatientModal } from "../../actions/modal"
import { createNewPatient, readPatientList } from "../../actions/patient"

const StyledModal = Modal.styled`
  width: 60rem;
  height: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`

export class CreateNewPatientModal extends Component {
    submitCreateNewPatientForm = async (formValues) => {
        await this.props.createNewPatient(formValues)
        await this.props.readPatientList()
        await this.props.closeCreateNewPatientModal()
    }
    render() {
        return (
            <div>
                <StyledModal
                    isOpen={this.props.modal.createNewPatientModalIsOpen}
                    onBackgroundClick={this.props.closeCreateNewPatientModal}
                    onEscapeKeydown={this.props.closeCreateNewPatientModal}
                >
                    <Form onSubmit={this.submitCreateNewPatientForm}>
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
                                    <label>Age</label>
                                    <Field name="age" component="input" type="number"></Field>
                                </div>
                                <div>
                                    <label>Sex</label>
                                    <Field name="sex" component="select" initialValue="Male">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Field>
                                </div>
                                <div>
                                    <label>Short Summary</label>
                                    <Field name="shortSummary" component="textarea"></Field>
                                </div>
                                <div>
                                    <label>Present Diagnosis</label>
                                    <Field
                                        name="presentDiagnosis"
                                        component="input"
                                        type="text"
                                    ></Field>
                                </div>
                                <div>
                                    <button type="submit" disabled={submitting || pristine}>
                                        Add Patient
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
    openCreateNewPatientModal,
    closeCreateNewPatientModal,
    createNewPatient,
    readPatientList,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPatientModal)
