import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

import DatapointAutocomplete from "./Search/DatapointAutocompleteCombobox"

const DatapointAutocompleteAdapter = ({ input }) => {
    return <DatapointAutocomplete onChange={input.onChange} />
}

export class Test extends Component {
    handleonSubmit = (formValues) => {
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
                                <Field name="test">
                                    {(props) => (
                                        <div>
                                            <input
                                                name={props.input.name}
                                                onChange={(event) =>
                                                    props.input.onChange(
                                                        event.target.value.toUpperCase()
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </Field>
                                <button
                                    type="button"
                                    onClick={() => push("datapoint", undefined)}
                                >
                                    Add datapoint
                                </button>
                                <FieldArray name="datapoint">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <div key={name}>
                                                <label>
                                                    Datapoint. #{index + 1}
                                                </label>
                                                <Field
                                                    name={name}
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
                                            </div>
                                        ))
                                    }
                                </FieldArray>
                                <pre>{JSON.stringify(values, 0, 2)}</pre>
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

export default connect(mapStateToProps, mapDispatchToProps)(Test)
