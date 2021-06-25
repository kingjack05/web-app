import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import styled from "styled-components"
import history from "../../history"

import StandardBlock from "./StandardBlock"

import { createNewPublicModule } from "../../actions/module"

const BlockWrapper = styled.div``
const StandardBlockAdapter = ({ input }) => {
    return <StandardBlock onChange={input.onChange} />
}

export class Create extends Component {
    handleonSubmit = async (formValues) => {
        await this.props.createNewPublicModule(formValues)
        history.push("./myModules")
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
                                <Field name="name" component="input" placeholder="Module Name" />
                                <button type="button" onClick={() => push("content", undefined)}>
                                    Add block
                                </button>
                                <FieldArray name="content">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <BlockWrapper key={index}>
                                                <Field
                                                    name={name}
                                                    component={StandardBlockAdapter}
                                                />
                                            </BlockWrapper>
                                        ))
                                    }
                                </FieldArray>
                                <pre>{JSON.stringify(values, 0, 2)}</pre>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={submitting || pristine}
                                >
                                    {submitting ? "Submitting" : "Save"}
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

const mapDispatchToProps = { createNewPublicModule }

export default connect(mapStateToProps, mapDispatchToProps)(Create)
