import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

import { openCreateNewPatientModal, closeCreateNewPatientModal } from "../../actions/modal"
import { createNewPatient, readPatientList } from "../../actions/patient"
//Components
import DaignosisAutocomplete from "../Search/DiagnosisAutocomplete"

import StyledModal from "../Utilities/StyledModal"

const DaignosisWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const DaignosisAutocompleteAdapter = ({ input }) => {
    return <DaignosisAutocomplete onChange={input.onChange} />
}

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
                    <Form
                        onSubmit={this.submitCreateNewPatientForm}
                        mutators={{
                            ...arrayMutators,
                        }}
                    >
                        {({
                            handleSubmit,
                            submitting,
                            pristine,
                            form: {
                                mutators: { push, pop },
                            },
                        }) => (
                            <form onSubmit={handleSubmit}>
                                {" "}
                                <div>
                                    <label>Title: </label>
                                    <Field
                                        name="title"
                                        component="input"
                                        type="text"
                                        placeholder="Title"
                                    ></Field>
                                </div>
                                <div>
                                    <label>Age: </label>
                                    <Field name="age" component="input" type="number"></Field>
                                </div>
                                <div>
                                    <label>Sex: </label>
                                    <Field name="sex" component="select" initialValue="Male">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Field>
                                </div>
                                <div>
                                    <label>Short Summary: </label>
                                    <Field name="shortSummary" component="textarea"></Field>
                                </div>
                                <div>
                                    <label>Present Diagnosis: </label>
                                    <button
                                        type="button"
                                        onClick={() => push("presentDiagnosis", undefined)}
                                    >
                                        Add Diagnosis
                                    </button>
                                    <FieldArray name="presentDiagnosis">
                                        {({ fields }) =>
                                            fields.map((name, index) => (
                                                <DaignosisWrapper key={index}>
                                                    <label>#{index + 1}</label>
                                                    <Field
                                                        name={name + ".field"}
                                                        component={DaignosisAutocompleteAdapter}
                                                    />
                                                    <span
                                                        onClick={() => fields.remove(index)}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        ???
                                                    </span>
                                                </DaignosisWrapper>
                                            ))
                                        }
                                    </FieldArray>
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
