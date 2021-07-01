import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
//Actions
import { readModule } from "../../actions/module"
import { readPatientNote, updatePatientNote } from "../../actions/patient"
//Components
import Accordion from "../Utilities/Accordion"

const FieldWrapper = styled.div``

const DatapointToFormFields = (element, index) => {
    switch (element.field.datapointType) {
        case "String":
            return (
                <FieldWrapper key={index}>
                    <label>{element.field.name}: </label>
                    <Field name={element.field.name} component="input" type="text" />
                </FieldWrapper>
            )
        case "Boolean":
            return (
                <FieldWrapper key={index}>
                    <label>{element.field.name}: </label>
                    <Field name={element.field.name} component="select">
                        <option />
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Field>
                </FieldWrapper>
            )
        case "Number":
            return (
                <FieldWrapper key={index}>
                    <label>{element.field.name}: </label>
                    <Field name={element.field.name} component="input" type="number" />
                </FieldWrapper>
            )
        default:
            return null
    }
}
const CustomFieldToFormField = (element, index) => (
    <FieldWrapper key={index}>
        <label>{element}: </label>
        <Field name={element} component="input" type="text" />
    </FieldWrapper>
)

export class ModuleToWorkup extends Component {
    componentDidMount() {
        this.props.readModule({
            public: this.props.patient.noteData.workups[this.props.patient.workupIndex].publicOrNot,
            category: this.props.patient.noteData.workups[this.props.patient.workupIndex].category,
            id: this.props.patient.noteData.workups[this.props.patient.workupIndex].module,
        })
    }
    saveWorkupValues = async (formValues) => {
        const updatedNoteData = {
            workups: [...this.props.patient.noteData.workups],
        }
        updatedNoteData.workups[this.props.patient.workupIndex].values = formValues
        const noteID = this.props.patient.noteData._id
        const patientID = this.props.patient.patientData._id
        await this.props.updatePatientNote(updatedNoteData, noteID, patientID)
        await this.props.readPatientNote(noteID, patientID)
    }
    render() {
        return (
            <div>
                <Form
                    onSubmit={this.saveWorkupValues}
                    initialValues={
                        this.props.patient.noteData.workups[this.props.patient.workupIndex].values
                    }
                >
                    {({ handleSubmit, submitting, pristine }) =>
                        this.props.module.moduleData ? (
                            <form onSubmit={handleSubmit}>
                                {this.props.module.moduleData.content.map((element, index) => (
                                    <Accordion key={index} summary={element.title}>
                                        {element.content.map(DatapointToFormFields)}
                                        {element.customFields.map(CustomFieldToFormField)}
                                    </Accordion>
                                ))}
                                <div>
                                    <button type="submit" disabled={submitting || pristine}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        ) : null
                    }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ patient: state.patient, module: state.module })

const mapDispatchToProps = {
    readModule,
    readPatientNote,
    updatePatientNote,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleToWorkup)
