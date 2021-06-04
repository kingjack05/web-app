import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import styled from "styled-components"

import StandardBlock from "./StandardBlock"

const BlockWrapper = styled.div``
const StandardBlockAdapter = ({ input }) => {
    return <StandardBlock onChange={input.onChange} />
}
export class Create extends Component {
    handleonSubmit = (formValues) => {
        console.log(formValues)
    }
    render() {
        return (
            <div>
                {" "}
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
                                    onClick={() => push("content", undefined)}
                                >
                                    Add block
                                </button>
                                <FieldArray name="content">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <BlockWrapper key={index}>
                                                <Field
                                                    name={name}
                                                    component={
                                                        StandardBlockAdapter
                                                    }
                                                />
                                            </BlockWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Create)
