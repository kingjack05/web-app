import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import ExportsEditor from "./Utilities/ExportsEditor"
import "draft-js/dist/Draft.css"

// import StyledToggle from "./Utilities/StyledToggle"
import DatapointAutocomplete from "./Search/DatapointAutocompleteCombobox"
import StandardBlock from "./Module/StandardBlock"
import styled from "styled-components"
import Switch from "@material-ui/core/Switch"

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const StandardBlockAdapter = ({ input }) => {
    return <StandardBlock onChange={input.onChange} />
}
const DatapointAutocompleteAdapter = ({ input }) => {
    return <DatapointAutocomplete onChange={input.onChange} />
}

const SwitchAdapter = ({ input: { onChange, value }, label, ...rest }) => (
    <Switch label={label} checked={!!value} onChange={onChange} {...rest} />
)

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
                                                    props.input.onChange(event.target.value.toUpperCase())
                                                }
                                            />
                                        </div>
                                    )}
                                </Field>
                                <Field name="employed" label="Employed?" component={SwitchAdapter} />
                                <button type="button" onClick={() => push("datapoint", undefined)}>
                                    Add datapoint
                                </button>
                                <FieldArray name="datapoint">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <Wrapper key={index}>
                                                <label>Datapoint. #{index + 1}</label>
                                                <Field
                                                    name={name}
                                                    component={DatapointAutocompleteAdapter}
                                                    parse={(value) => value && value.toUpperCase()}
                                                />
                                                <span
                                                    onClick={() => fields.remove(index)}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    ❌
                                                </span>
                                            </Wrapper>
                                        ))
                                    }
                                </FieldArray>
                                <Field name="block" component={StandardBlockAdapter} />
                                <Field name="editorTest">
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
