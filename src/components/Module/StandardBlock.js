import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

import DatapointAutocomplete from "../Search/DatapointAutocompleteCombobox"

import { ChevronUp, ChevronDown } from "@styled-icons/boxicons-regular"

const BlockTitle = styled.input`
    border: 0px;
`
const BlockTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid;
`
const BlockDetails = styled.div`
    display: ${(props) => (props.show ? "block" : "none")};
    border: solid;
`
const DatapointWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const BorderedWrapper = styled.div`
    border: solid;
`
const DatapointAutocompleteAdapter = ({ input }) => {
    return <DatapointAutocomplete value={input.value} onChange={input.onChange} />
}

export class StandardBlock extends Component {
    state = {
        show: false,
    }
    onToggle = () => {
        this.setState({ show: !this.state.show })
    }
    handleonSubmit = (formValues) => {
        this.props.onChange(formValues)
    }
    render() {
        return (
            <div>
                <Form
                    // accepts initial values from value props of adapter
                    initialValues={this.props.value}
                    onSubmit={this.handleonSubmit}
                    mutators={{
                        ...arrayMutators,
                    }}
                    render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values,
                        form: {
                            mutators: { push, pop },
                        },
                    }) => {
                        return (
                            <div>
                                <Field name="title">
                                    {(props) => (
                                        <BlockTitleWrapper>
                                            <BlockTitle
                                                name={props.input.name}
                                                value={values.title}
                                                onChange={(event) =>
                                                    props.input.onChange(event.target.value)
                                                }
                                                placeholder="Block name"
                                                pristine={pristine}
                                            />
                                            {this.state.show ? (
                                                <ChevronUp size="24" onClick={this.onToggle} />
                                            ) : (
                                                <ChevronDown size="24" onClick={this.onToggle} />
                                            )}
                                        </BlockTitleWrapper>
                                    )}
                                </Field>
                                <BlockDetails show={this.state.show}>
                                    <BorderedWrapper>
                                        <button
                                            type="button"
                                            onClick={() => push("content", undefined)}
                                        >
                                            Add datapoint
                                        </button>
                                        <FieldArray name="content">
                                            {({ fields }) =>
                                                fields.map((name, index) => (
                                                    <DatapointWrapper key={index}>
                                                        <label>#{index + 1}</label>
                                                        <Field
                                                            name={name + ".field"}
                                                            component={DatapointAutocompleteAdapter}
                                                        />
                                                        <span
                                                            onClick={() => fields.remove(index)}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            ❌
                                                        </span>
                                                    </DatapointWrapper>
                                                ))
                                            }
                                        </FieldArray>
                                    </BorderedWrapper>
                                    <BorderedWrapper>
                                        <button
                                            type="button"
                                            onClick={() => push("customFields", undefined)}
                                        >
                                            Add custom field
                                        </button>
                                        <FieldArray name="customFields">
                                            {({ fields }) =>
                                                fields.map((name, index) => (
                                                    <DatapointWrapper key={index}>
                                                        <label>#{index + 1}</label>
                                                        <Field
                                                            name={name}
                                                            component="input"
                                                            type="text"
                                                            placeholder="Field name"
                                                        />
                                                        <span
                                                            onClick={() => fields.remove(index)}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            ❌
                                                        </span>
                                                    </DatapointWrapper>
                                                ))
                                            }
                                        </FieldArray>
                                    </BorderedWrapper>
                                    <button type="submit" onClick={handleSubmit}>
                                        Save block
                                    </button>
                                </BlockDetails>
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

export default connect(mapStateToProps, mapDispatchToProps)(StandardBlock)
