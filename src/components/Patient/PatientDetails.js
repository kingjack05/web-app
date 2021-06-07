import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
//Actions
import { readPatientData, updatePatientData } from "../../actions/patient"
//Components
import DaignosisAutocomplete from "../Search/DiagnosisAutocomplete"

const InputWrapper = styled.div`
    input {
        border: 0px;
    }
`
const DaignosisWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const DaignosisAutocompleteAdapter = ({ input }) => {
    return <DaignosisAutocomplete onChange={input.onChange} />
}

export class PatientDetails extends Component {
    submitCreateNewPatientForm = async (formValues) => {
        await this.props.updatePatientData(formValues, this.props.id)
        await this.props.readPatientData({ id: this.props.id })
    }
    componentDidMount() {
        this.props.readPatientData({ id: this.props.id })
    }
    render() {
        return (
            <div>
                <div>My id is {this.props.id}</div>
                <Form
                    onSubmit={this.submitCreateNewPatientForm}
                    initialValues={this.props.patient.patientData}
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
                            <InputWrapper>
                                <label>Title: </label>
                                <Field name="title" component="input" type="text" placeholder="Title"></Field>
                            </InputWrapper>
                            <InputWrapper>
                                <label>Age: </label>
                                <Field name="age" component="input" type="number"></Field>
                            </InputWrapper>
                            <div>
                                <label>Sex</label>
                                <Field name="sex" component="select" initialValue="true">
                                    <option value="true">Male</option>
                                    <option value="false">Female</option>
                                </Field>
                            </div>
                            <div>
                                <label>Short Summary</label>
                                <br />
                                <Field name="shortSummary" component="textarea"></Field>
                            </div>
                            <div>
                                <label>Present Diagnosis</label>
                                <button type="button" onClick={() => push("presentDiagnosis", undefined)}>
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
                                                    ❌
                                                </span>
                                            </DaignosisWrapper>
                                        ))
                                    }
                                </FieldArray>
                            </div>
                            <div>
                                <button type="submit" disabled={submitting || pristine}>
                                    Save
                                </button>
                            </div>
                        </form>
                    )}
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient })

const mapDispatchToProps = { readPatientData, updatePatientData }

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails)
