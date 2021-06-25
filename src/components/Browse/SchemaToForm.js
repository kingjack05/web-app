import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import styled from "styled-components"

// *Must take schema, onSubmit and initialValues as prop

const ButtonGroup = styled.div`
    border: solid;
    display: ${(props) => (props.isAdmin ? "block" : "none")};
`

export class SchemaToForm extends Component {
    handleonSubmit = async (formValues) => {
        await this.props.onSubmit(formValues)
    }
    render() {
        return (
            <div>
                <Form
                    onSubmit={this.handleonSubmit}
                    initialValues={this.props.initialValues ? this.props.initialValues : null}
                    render={({ handleSubmit, form, submitting, pristine }) => (
                        <form onSubmit={handleSubmit}>
                            <fieldset
                                disabled={
                                    this.props.auth.userData.authorization === "Administrator"
                                        ? ""
                                        : "disabled"
                                }
                            >
                                {this.props.schema.map((element) => {
                                    if (element.data.type === "String") {
                                        return (
                                            <div key={element.fieldname}>
                                                <label>{element.fieldname}</label>
                                                <Field
                                                    name={element.fieldname}
                                                    component="input"
                                                    type="text"
                                                    placeholder={element.fieldname}
                                                />
                                            </div>
                                        )
                                    } else if (element.data.type === "Single Choice") {
                                        return (
                                            <div key={element.fieldname}>
                                                <label>{element.fieldname}</label>
                                                <Field name={element.fieldname} component="select">
                                                    <option />
                                                    {element.data.enum.map((element) => (
                                                        <option value={element}>{element}</option>
                                                    ))}
                                                </Field>
                                            </div>
                                        )
                                    }
                                    return null
                                })}
                                <ButtonGroup
                                    isAdmin={
                                        this.props.auth.userData.authorization === "Administrator"
                                    }
                                >
                                    <button type="submit" disabled={submitting || pristine}>
                                        Save changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Undo Changes
                                    </button>
                                </ButtonGroup>
                            </fieldset>
                        </form>
                    )}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SchemaToForm)
