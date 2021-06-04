import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

import DatapointAutocomplete from "../Search/DatapointAutocompleteCombobox"

const BlockTitle = styled.input``
const DatapointWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const DatapointAutocompleteAdapter = ({ input }) => {
    return <DatapointAutocomplete onChange={input.onChange} />
}

export class StandardBlock extends Component {
    handleonSubmit = (formValues) => {
        this.props.onChange(formValues)
        console.log(formValues)
    }
    render() {
        return (
            <div>
                <Form
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
                                <Field name="name">
                                    {(props) => (
                                        <div>
                                            <BlockTitle
                                                name={props.input.name}
                                                onChange={(event) =>
                                                    props.input.onChange(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </Field>
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
                                                    component={
                                                        DatapointAutocompleteAdapter
                                                    }
                                                />
                                                <span
                                                    onClick={() =>
                                                        fields.remove(index)
                                                    }
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
                                <button type="submit" onClick={handleSubmit}>
                                    Save
                                </button>
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
