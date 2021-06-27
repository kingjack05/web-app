import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Form, Field } from "react-final-form"
import { convertToRaw } from "draft-js"

import { ChevronUp, ChevronDown } from "@styled-icons/boxicons-regular"

import ExportsEditor from "./ExportsEditor"

const ExportsNameWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid;
`
const ExportsName = styled.input`
    border: 0px;
`
const ExportsContent = styled.div`
    display: ${(props) => (props.show ? "block" : "none")};
    border: solid;
`
const BorderedWrapper = styled.div`
    border: solid;
`
export class ExportsWrapper extends Component {
    state = {
        show: false,
    }
    onToggle = () => {
        this.setState({ show: !this.state.show })
    }
    handleonSubmit = (formValues) => {
        const convertedformValues = {
            ...formValues,
            content: JSON.stringify(convertToRaw(formValues.content.getCurrentContent())),
        }
        this.props.onChange(convertedformValues)
    }
    render() {
        return (
            <div>
                <Form
                    // accepts initial values from value props of adapter
                    initialValues={this.props.value}
                    onSubmit={this.handleonSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => {
                        return (
                            <div>
                                <Field name="name">
                                    {(props) => (
                                        <ExportsNameWrapper>
                                            <ExportsName
                                                name={props.input.name}
                                                value={values.name}
                                                onChange={(event) =>
                                                    props.input.onChange(event.target.value)
                                                }
                                                placeholder="Exports to..."
                                                pristine={pristine}
                                            />
                                            {this.state.show ? (
                                                <ChevronUp size="24" onClick={this.onToggle} />
                                            ) : (
                                                <ChevronDown size="24" onClick={this.onToggle} />
                                            )}
                                        </ExportsNameWrapper>
                                    )}
                                </Field>
                                <ExportsContent show={this.state.show}>
                                    <BorderedWrapper>
                                        <Field name="content">
                                            {(props) => (
                                                <div>
                                                    <ExportsEditor
                                                        name={props.input.name}
                                                        value={props.input.value}
                                                        onChange={props.input.onChange}
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                    </BorderedWrapper>
                                    <button type="submit" onClick={handleSubmit}>
                                        Save
                                    </button>
                                </ExportsContent>
                            </div>
                        )
                    }}
                ></Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExportsWrapper)
